(function () {
  if (window.matchMedia('(max-width: 991px)').matches) return;

  var section = document.getElementById('whos-behind');
  if (!section) return;

  var card = section.querySelector('.whos-behind-spotlight-card');
  var trigger = card || section;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasRevealed = false;

  function markVisible() {
    section.classList.add('whos-behind-visible');
  }

  function ensureFinalState() {
    if (typeof gsap !== 'undefined' && card) {
      gsap.killTweensOf(card);
      gsap.set(card, { y: 0, opacity: 1, filter: 'blur(0px)' });
    }
    markVisible();
  }

  function playReveal() {
    if (!card) {
      markVisible();
      return;
    }

    if (hasRevealed) {
      ensureFinalState();
      return;
    }

    hasRevealed = true;

    if (reducedMotion || typeof gsap === 'undefined') {
      markVisible();
      return;
    }

    gsap.killTweensOf(card);
    gsap.fromTo(
      card,
      { y: 30, opacity: 0, filter: 'blur(5px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        delay: 0.3,
        ease: 'power1.out',
        overwrite: 'auto',
        onComplete: markVisible
      }
    );
  }

  window.revealWhosBehindSection = function () {
    if (hasRevealed) {
      ensureFinalState();
      return;
    }
    playReveal();
  };

  function initGsap() {
    document.documentElement.classList.add('whos-behind-motion-ready');

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      initFallback();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) {
      hasRevealed = true;
      markVisible();
      return;
    }

    gsap.set(card, { y: 30, opacity: 0, filter: 'blur(5px)' });

    ScrollTrigger.create({
      trigger: trigger,
      start: 'top 85%',
      once: true,
      onEnter: playReveal,
      invalidateOnRefresh: true
    });

    ScrollTrigger.refresh();
  }

  function initFallback() {
    document.documentElement.classList.add('whos-behind-motion-ready');

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

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || hasRevealed) return;
          hasRevealed = true;
          markVisible();
          observer.disconnect();
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(trigger);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGsap);
  } else {
    initGsap();
  }
})();
