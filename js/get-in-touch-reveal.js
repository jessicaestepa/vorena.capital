(function () {
  var section = document.getElementById('get-in-touch');
  if (!section) return;

  var isMobile = window.matchMedia('(max-width: 991px)').matches;
  var panel = section.querySelector('.get-in-touch-panel');
  var trigger = section.querySelector('.get-in-touch-stage') || section;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasRevealed = false;
  var HEADLINE_DELAY_MS = 520;
  var OPTIONS_DELAY_MS = 680;

  function markVisible() {
    section.classList.add('get-in-touch-visible');
  }

  function markHeadlineVisible() {
    var wasVisible = section.classList.contains('get-in-touch-headline-visible');
    section.classList.add('get-in-touch-headline-visible');

    if (!wasVisible) {
      section.dispatchEvent(new CustomEvent('vorena:get-in-touch-headline-ready'));

      if (window.vorenaGetInTouchHeadline && typeof window.vorenaGetInTouchHeadline.play === 'function') {
        window.vorenaGetInTouchHeadline.play();
      }
    }
  }

  function markOptionsVisible() {
    section.classList.add('get-in-touch-options-visible');
  }

  function ensureFinalState() {
    markVisible();
    markHeadlineVisible();
    markOptionsVisible();
  }

  function playReveal() {
    if (hasRevealed) {
      ensureFinalState();
      return;
    }

    hasRevealed = true;
    markVisible();

    if (reducedMotion) {
      ensureFinalState();
      return;
    }

    if (isMobile) {
      window.setTimeout(markHeadlineVisible, HEADLINE_DELAY_MS);
      window.setTimeout(markOptionsVisible, OPTIONS_DELAY_MS);
      return;
    }

    window.setTimeout(markHeadlineVisible, HEADLINE_DELAY_MS);
    window.setTimeout(markOptionsVisible, OPTIONS_DELAY_MS);
  }

  window.revealGetInTouchSection = function () {
    playReveal();
  };

  function init() {
    document.documentElement.classList.add('get-in-touch-motion-ready');

    if (reducedMotion) {
      hasRevealed = true;
      ensureFinalState();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      hasRevealed = true;
      ensureFinalState();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || hasRevealed) return;
          playReveal();
          observer.disconnect();
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(trigger);

    var rect = trigger.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      playReveal();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
