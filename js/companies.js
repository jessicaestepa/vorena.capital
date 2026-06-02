(function () {
  if (window.matchMedia('(max-width: 991px)').matches) return;

  var section = document.getElementById('companies');
  if (!section) return;

  var left = section.querySelector('.service-tabs-grid-left');
  var right = section.querySelector('.service-tabs-grid-right');
  var trigger = section.querySelector('.service-tabs-wrapper') || section;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasRevealed = false;

  function markVisible() {
    section.classList.add('companies-visible');
  }

  function ensureFinalState() {
    if (typeof gsap !== 'undefined' && left && right) {
      gsap.killTweensOf([left, right]);
      gsap.set(left, { x: 0, opacity: 1, filter: 'blur(0px)' });
      gsap.set(right, { x: 0, opacity: 1, filter: 'blur(0px)' });
    }
    markVisible();
  }

  function playReveal() {
    if (!left || !right) return;

    if (hasRevealed) {
      ensureFinalState();
      return;
    }

    if (typeof gsap === 'undefined') {
      hasRevealed = true;
      markVisible();
      return;
    }

    gsap.killTweensOf([left, right]);
    gsap.set(left, { x: -30, opacity: 0, filter: 'blur(5px)' });
    gsap.set(right, { x: 30, opacity: 0, filter: 'blur(5px)' });

    gsap.to(left, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    gsap.to(right, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power3.out',
      delay: 0.12,
      overwrite: 'auto',
      onComplete: function () {
        hasRevealed = true;
        markVisible();
      }
    });
  }

  window.revealCompaniesSection = function () {
    if (hasRevealed) {
      ensureFinalState();
      return;
    }
    playReveal();
  };

  function initGsap() {
    document.documentElement.classList.add('companies-motion-ready');

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      initFallback();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) {
      gsap.set([left, right], { clearProps: 'all', opacity: 1 });
      hasRevealed = true;
      markVisible();
      return;
    }

    gsap.set(left, { x: -30, opacity: 0, filter: 'blur(5px)' });
    gsap.set(right, { x: 30, opacity: 0, filter: 'blur(5px)' });

    ScrollTrigger.create({
      trigger: trigger,
      start: 'top 80%',
      once: true,
      onEnter: playReveal,
      invalidateOnRefresh: true
    });

    ScrollTrigger.refresh();
  }

  function initFallback() {
    document.documentElement.classList.add('companies-motion-ready');

    if (reducedMotion) {
      hasRevealed = true;
      markVisible();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      hasRevealed = true;
      markVisible();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || hasRevealed) return;
        hasRevealed = true;
        markVisible();
        observer.disconnect();
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -8% 0px'
    });

    observer.observe(trigger);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGsap);
  } else {
    initGsap();
  }
})();
