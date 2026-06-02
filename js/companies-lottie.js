(function () {
  var JSON_PATHS = [
    'images/waves-transparent-lila-cian.json?v=13',
    'public/waves-transparent-lila-cian.json?v=13'
  ];
  var CDN_LOTTIE =
    'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js';
  var animation = null;
  var booted = false;
  var pathIndex = 0;

  function getLottie() {
    return window.lottie || window.bodymovin;
  }

  function getContainer() {
    return document.querySelector('.companies-title-card-waves-lottie');
  }

  function resolveJsonUrl(relativePath) {
    try {
      return new URL(relativePath, window.location.href).href;
    } catch (e) {
      return relativePath;
    }
  }

  function markReady(container) {
    container.classList.add('is-lottie-ready');
    container.classList.remove('is-lottie-error');
    var card = container.closest('.companies-title-card');
    if (card) card.classList.add('has-waves-lottie');
  }

  function markError(container, message) {
    container.classList.add('is-lottie-error');
    console.warn('[companies-lottie]', message);
  }

  function styleWavesSvg(container) {
    var svg = container.querySelector('svg');
    if (!svg) return;

    svg.querySelectorAll('rect[fill="#011424"], rect[fill="rgb(1,20,36)"]').forEach(function (rect) {
      rect.remove();
    });

    var paths = svg.querySelectorAll('g path[stroke-width]');
    var purple = '#302961';
    var cyan = '#95f3eb';

    paths.forEach(function (path, index) {
      if (!path.getAttribute('d')) return;
      path.setAttribute('stroke', index % 2 === 0 ? purple : cyan);
      path.setAttribute('fill', 'none');
    });
  }

  function playAnimation(container) {
    if (!animation) return;
    animation.resize();
    styleWavesSvg(container);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animation.goToAndStop(0, true);
    } else {
      animation.play();
    }
    markReady(container);
  }

  function loadFromPath(container, lottieLib) {
    if (pathIndex >= JSON_PATHS.length) {
      markError(
        container,
        'No se pudo cargar el JSON. Usa un servidor local: npm run dev'
      );
      return;
    }

    var jsonPath = JSON_PATHS[pathIndex];
    var jsonUrl = resolveJsonUrl(jsonPath);

    if (typeof lottieLib.setLocationHref === 'function') {
      lottieLib.setLocationHref(jsonUrl.replace(/[^/]+$/, ''));
    }

    if (animation) {
      animation.destroy();
      animation = null;
    }

    container.innerHTML = '';

    animation = lottieLib.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: jsonUrl,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMax meet',
        className: 'companies-waves-svg',
        progressiveLoad: false,
        hideOnTransparent: true
      }
    });

    animation.setSubframe(true);

    animation.addEventListener('DOMLoaded', function () {
      playAnimation(container);
    });

    animation.addEventListener('data_failed', function () {
      pathIndex += 1;
      loadFromPath(container, lottieLib);
    });

    animation.addEventListener('error', function () {
      pathIndex += 1;
      loadFromPath(container, lottieLib);
    });
  }

  function mountWaves() {
    var container = getContainer();
    if (!container || container.dataset.lottieMounted === 'true') return;

    var lottieLib = getLottie();
    if (!lottieLib) {
      window.setTimeout(mountWaves, 150);
      return;
    }

    container.dataset.lottieMounted = 'true';
    pathIndex = 0;
    loadFromPath(container, lottieLib);
  }

  function ensureLottieScript(callback) {
    if (getLottie()) {
      callback();
      return;
    }

    var existing = document.querySelector('script[data-companies-lottie-cdn]');
    if (existing) {
      existing.addEventListener('load', callback, { once: true });
      existing.addEventListener('error', callback, { once: true });
      return;
    }

    var script = document.createElement('script');
    script.src = CDN_LOTTIE;
    script.async = true;
    script.dataset.companiesLottieCdn = 'true';
    script.onload = callback;
    script.onerror = function () {
      console.error('[companies-lottie] No se pudo cargar lottie-web desde CDN.');
      var container = getContainer();
      if (container) markError(container, 'Lottie library failed to load');
    };
    document.head.appendChild(script);
  }

  function refreshWaves() {
    var container = getContainer();
    if (!container || !animation) return;
    playAnimation(container);
  }

  function watchCompaniesReveal() {
    var section = document.getElementById('companies');
    if (!section) return;

    if (section.classList.contains('companies-visible')) {
      refreshWaves();
    }

    var observer = new MutationObserver(function () {
      if (section.classList.contains('companies-visible')) {
        refreshWaves();
      }
    });

    observer.observe(section, { attributes: true, attributeFilter: ['class'] });

    if ('IntersectionObserver' in window) {
      var visibilityObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) refreshWaves();
        });
      }, { threshold: 0.1 });

      visibilityObserver.observe(section);
    }
  }

  function boot() {
    if (booted) return;
    booted = true;
    ensureLottieScript(function () {
      mountWaves();
      watchCompaniesReveal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
