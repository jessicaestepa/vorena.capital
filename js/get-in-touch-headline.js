(function () {
  var section = document.getElementById('get-in-touch');
  if (!section) return;

  var headline = section.querySelector('.get-in-touch-headline');
  var scrambleEl = section.querySelector('.get-in-touch-headline-scramble');
  var eggEl = section.querySelector('.get-in-touch-headline-egg');
  if (!headline || !scrambleEl) return;

  var SCRAMBLE_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var SCRAMBLE_MS = 820;
  var MAX_PLAYS = 3;
  var STORAGE_KEY = 'vorena-get-in-touch-scramble-count';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var isAnimating = false;
  var isLocked = false;
  var interactionReady = false;
  var autoPlayDone = false;
  var rafId = null;
  var safetyTimer = null;
  var finalTextTarget = '';

  function syncFinalTextTarget() {
    var next = (scrambleEl.getAttribute('data-scramble-target') || scrambleEl.textContent || 'GET IN TOUCH')
      .trim()
      .toUpperCase();

    if (/^[01 ]+$/.test(next)) {
      next = 'GET IN TOUCH';
    }

    finalTextTarget = next;
    scrambleEl.setAttribute('data-scramble-target', next);
  }

  function getFinalText() {
    return finalTextTarget || 'GET IN TOUCH';
  }

  function getPlayCount() {
    try {
      var n = parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10);
      return Number.isFinite(n) ? n : 0;
    } catch (err) {
      return 0;
    }
  }

  function setPlayCount(n) {
    try {
      sessionStorage.setItem(STORAGE_KEY, String(Math.max(0, n)));
    } catch (err) {
      /* ignore */
    }
  }

  function isHeadlineReady() {
    return (
      section.classList.contains('get-in-touch-headline-visible') ||
      headline.classList.contains('mobile-revealed')
    );
  }

  function cancelAnimation() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (safetyTimer) {
      clearTimeout(safetyTimer);
      safetyTimer = null;
    }
  }

  function setEggState(progress) {
    if (!eggEl) return;

    if (isAnimating && progress > 0.15 && progress < 0.9) {
      eggEl.textContent = Math.random() < 0.55 ? '11' : '10';
      return;
    }

    eggEl.textContent = '11';
  }

  function lockStatic() {
    isLocked = true;
    interactionReady = true;
    cancelAnimation();
    isAnimating = false;
    scrambleEl.textContent = getFinalText();
    scrambleEl.classList.remove('is-scramble-active');
    headline.classList.remove('is-scrambling', 'is-scramble-busy');
    headline.classList.add('is-scramble-locked');
    section.classList.add('get-in-touch-headline-decoded', 'get-in-touch-headline-locked');
    setEggState(1);
  }

  function showFinal() {
    cancelAnimation();
    isAnimating = false;
    scrambleEl.textContent = getFinalText();
    scrambleEl.classList.remove('is-scramble-active');
    headline.classList.remove('is-scrambling', 'is-scramble-busy');
    section.classList.add('get-in-touch-headline-decoded');
    setEggState(1);
  }

  function prepareInitial() {
    scrambleEl.textContent = buildBinaryFrame(getFinalText());
    scrambleEl.classList.remove('is-scramble-active');
    section.classList.remove('get-in-touch-headline-decoded', 'get-in-touch-headline-locked');
    setEggState(0);
  }

  function registerCompletedPlay() {
    if (isLocked) return;

    var count = getPlayCount() + 1;
    setPlayCount(count);

    if (count >= MAX_PLAYS) {
      lockStatic();
    }
  }

  function canAnimate() {
    return !isLocked && !isAnimating && !reducedMotion && isHeadlineReady();
  }

  function randomChar(progress) {
    if (progress < 0.62) {
      return Math.random() < 0.82 ? '0' : '1';
    }
    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }

  function buildBinaryFrame(finalText) {
    var out = '';
    for (var i = 0; i < finalText.length; i++) {
      out += finalText.charAt(i) === ' ' ? ' ' : Math.random() < 0.5 ? '0' : '1';
    }
    return out;
  }

  function buildFrame(finalText, progress) {
    var out = '';
    var len = finalText.length;

    for (var i = 0; i < len; i++) {
      var target = finalText.charAt(i);
      if (target === ' ') {
        out += ' ';
        continue;
      }

      var threshold = (i + 0.5) / (len + 0.22);
      if (progress >= threshold) {
        out += target;
      } else {
        out += randomChar(progress);
      }
    }

    return out;
  }

  function playScramble(options) {
    var opts = options || {};
    if (!canAnimate()) {
      if (opts.onComplete) opts.onComplete();
      return false;
    }

    var finalText = getFinalText();
    var completed = false;

    isAnimating = true;
    headline.classList.add('is-scrambling', 'is-scramble-busy');
    scrambleEl.classList.add('is-scramble-active');
    section.classList.remove('get-in-touch-headline-decoded');
    cancelAnimation();

    scrambleEl.textContent = buildBinaryFrame(finalText);
    setEggState(0.05);

    var start = performance.now();

    function complete() {
      if (completed) return;
      completed = true;
      showFinal();
      if (opts.countPlay !== false) {
        registerCompletedPlay();
      }
      if (opts.onComplete) opts.onComplete();
    }

    safetyTimer = window.setTimeout(complete, SCRAMBLE_MS + 200);

    function frame(now) {
      if (!isAnimating) return;

      var progress = Math.min(1, (now - start) / SCRAMBLE_MS);
      scrambleEl.textContent = buildFrame(finalText, progress);
      setEggState(progress);

      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
        return;
      }

      complete();
    }

    rafId = requestAnimationFrame(frame);
    return true;
  }

  function onHoverEnter() {
    if (!interactionReady || !canAnimate()) return;
    playScramble();
  }

  function onTap() {
    if (!interactionReady || !canAnimate()) return;
    playScramble();
  }

  function bindInteractions() {
    if (isLocked) return;

    if (canHover) {
      headline.addEventListener('mouseenter', onHoverEnter);
    } else {
      headline.addEventListener('click', onTap);
    }
  }

  function enableInteraction() {
    interactionReady = true;
    headline.classList.remove('is-scramble-busy');
    bindInteractions();
  }

  function scheduleAutoPlay() {
    if (autoPlayDone || isLocked || reducedMotion) return;
    if (!isHeadlineReady()) return;

    var attempts = 0;
    var maxAttempts = 120;

    function tick() {
      if (autoPlayDone || isLocked || reducedMotion || !isHeadlineReady()) return;

      if (!canAnimate()) {
        if (++attempts >= maxAttempts) return;
        requestAnimationFrame(tick);
        return;
      }

      playScramble({
        onComplete: function () {
          autoPlayDone = true;
          enableInteraction();
        }
      });
    }

    requestAnimationFrame(tick);
  }

  function onHeadlineReady() {
    scheduleAutoPlay();
  }

  window.vorenaGetInTouchHeadline = {
    play: scheduleAutoPlay
  };

  function watchHeadlineReveal() {
    section.addEventListener('vorena:get-in-touch-headline-ready', onHeadlineReady);

    if (!('MutationObserver' in window)) {
      onHeadlineReady();
      return;
    }

    var observer = new MutationObserver(function () {
      if (isHeadlineReady()) {
        onHeadlineReady();
      }
    });

    observer.observe(section, { attributes: true, attributeFilter: ['class'] });
    observer.observe(headline, { attributes: true, attributeFilter: ['class'] });

    if (isHeadlineReady()) {
      onHeadlineReady();
    }
  }

  syncFinalTextTarget();
  prepareInitial();

  if (getPlayCount() >= MAX_PLAYS || reducedMotion) {
    lockStatic();
    if (reducedMotion) {
      setPlayCount(MAX_PLAYS);
    }
  } else {
    watchHeadlineReveal();
  }

  document.addEventListener('vorena:lang-change', function () {
    syncFinalTextTarget();

    if (isLocked) {
      lockStatic();
      return;
    }

    prepareInitial();

    if (isHeadlineReady() && interactionReady) {
      showFinal();
    }
  });
})();
