(function () {
  var MOBILE_MQ = '(max-width: 991px)';
  var mobileMedia = window.matchMedia(MOBILE_MQ);
  var reducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

  function isMobile() {
    return mobileMedia.matches;
  }

  if (!isMobile()) return;

  var revealedIds = [];

  var CONFIG = [
    {
      section: '#manifesto',
      visibleClass: 'manifesto-visible',
      mode: 'item',
      items: [
        '.manifesto-display-wrap',
        '.manifesto-body',
        '.manifesto-verbs-block',
        '.manifesto-investor',
        '.manifesto-tagline',
        '.manifesto-signature-wrap'
      ]
    },
    {
      section: '#companies',
      visibleClass: 'companies-visible',
      mode: 'item',
      items: ['.companies-title-card', '.company-row-card']
    },
    {
      section: '#whos-behind',
      visibleClass: 'whos-behind-visible',
      mode: 'item',
      items: ['.whos-behind-headline-layer', '.whos-behind-spotlight-card']
    },
    {
      section: '#get-in-touch',
      visibleClass: 'get-in-touch-visible',
      mode: 'item',
      items: ['.get-in-touch-headline', '.get-in-touch-option', '.get-in-touch-work-bar']
    }
  ];

  function isRevealed(el) {
    return revealedIds.indexOf(el) !== -1;
  }

  function markRevealed(el) {
    if (!el || isRevealed(el)) return;
    revealedIds.push(el);
    el.classList.add('mobile-revealed');

    if (el.classList.contains('get-in-touch-headline')) {
      var touchSection = el.closest('.get-in-touch-section');
      if (touchSection && !touchSection.classList.contains('get-in-touch-headline-visible')) {
        touchSection.classList.add('get-in-touch-headline-visible');
        touchSection.dispatchEvent(new CustomEvent('vorena:get-in-touch-headline-ready'));
      }

      if (window.vorenaGetInTouchHeadline && typeof window.vorenaGetInTouchHeadline.play === 'function') {
        window.vorenaGetInTouchHeadline.play();
      }
    }

    if (el.classList.contains('get-in-touch-work-bar')) {
      var workSection = el.closest('.get-in-touch-section');
      if (workSection && !workSection.classList.contains('get-in-touch-work-bar-visible')) {
        workSection.classList.add('get-in-touch-work-bar-visible');
      }
    }
  }

  function markSectionVisible(sectionEl, visibleClass) {
    if (sectionEl && visibleClass) {
      sectionEl.classList.add(visibleClass);
      if (sectionEl.id === 'get-in-touch') {
        sectionEl.classList.add('get-in-touch-work-bar-visible');
      }
    }
  }

  function collectItems(sectionEl, selectors) {
    var list = [];
    selectors.forEach(function (selector) {
      sectionEl.querySelectorAll(selector).forEach(function (el) {
        list.push(el);
      });
    });
    return list;
  }

  function revealList(sectionEl, group, items, useStagger) {
    markSectionVisible(sectionEl, group.visibleClass);

    items.forEach(function (el, index) {
      el.classList.add('mobile-reveal');
      if (reducedMedia.matches) {
        markRevealed(el);
        return;
      }
      if (useStagger && group.stagger) {
        window.setTimeout(function () {
          markRevealed(el);
        }, index * group.stagger);
      } else {
        markRevealed(el);
      }
    });
  }

  function revealInstant(group) {
    var sectionEl = document.querySelector(group.section);
    if (!sectionEl) return;
    var items = collectItems(sectionEl, group.items);
    revealList(sectionEl, group, items, true);
  }

  function revealGroupNow(sectionSelector) {
    if (!isMobile()) return;
    var group = CONFIG.filter(function (entry) {
      return entry.section === sectionSelector;
    })[0];
    if (!group) return;
    revealInstant(group);
  }

  function observeSection(group) {
    var sectionEl = document.querySelector(group.section);
    if (!sectionEl) return;

    var items = collectItems(sectionEl, group.items);
    items.forEach(function (el) {
      el.classList.add('mobile-reveal');
    });

    if (!('IntersectionObserver' in window)) {
      revealList(sectionEl, group, items, true);
      return;
    }

    var sectionObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          obs.disconnect();
          revealList(sectionEl, group, items, true);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    sectionObserver.observe(sectionEl);
  }

  function observeItems(group, options) {
    var sectionEl = document.querySelector(group.section);
    if (!sectionEl) return;

    var items = collectItems(sectionEl, group.items);
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      revealList(sectionEl, group, items, false);
      return;
    }

    var observerOptions = options || {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    };

    items.forEach(function (el) {
      el.classList.add('mobile-reveal');

      var itemObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            markSectionVisible(sectionEl, group.visibleClass);
            markRevealed(el);
            obs.disconnect();
          });
        },
        observerOptions
      );

      itemObserver.observe(el);
    });
  }

  /* Manifesto columns use display:contents on mobile — observe within section root */
  function observeManifestoItems(group) {
    var sectionEl = document.querySelector(group.section);
    if (!sectionEl) return;

    observeItems(group, {
      root: sectionEl,
      threshold: 0.1,
      rootMargin: '0px 0px -5% 0px'
    });
  }

  function setupScrollReveal() {
    document.documentElement.classList.add('mobile-scroll-reveal-ready');

    if (reducedMedia.matches) {
      CONFIG.forEach(revealInstant);
      return;
    }

    CONFIG.forEach(function (group) {
      if (group.mode === 'section') {
        observeSection(group);
      } else if (group.section === '#manifesto') {
        observeManifestoItems(group);
      } else {
        observeItems(group);
      }
    });
  }

  window.revealManifestoSection = function () {
    revealGroupNow('#manifesto');
  };

  window.revealCompaniesSection = function () {
    revealGroupNow('#companies');
  };

  window.revealWhosBehindSection = function () {
    revealGroupNow('#whos-behind');
  };

  function init() {
    if (!isMobile()) return;
    setupScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  mobileMedia.addEventListener('change', function (event) {
    if (event.matches) {
      init();
      return;
    }
    document.documentElement.classList.remove('mobile-scroll-reveal-ready');
  });
})();
