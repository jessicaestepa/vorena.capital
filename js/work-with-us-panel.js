(function () {
  var trigger = document.getElementById('work-with-us-trigger');
  var slideout = document.getElementById('work-with-us-slideout');
  if (!trigger || !slideout) return;

  var roleItems = slideout.querySelectorAll('.work-with-us-role-item');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lastFocus = null;
  var openItem = null;

  function setOpen(isOpen) {
    slideout.classList.toggle('is-open', isOpen);
    slideout.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.documentElement.classList.toggle('editorial-slideout-open', isOpen);

    if (isOpen) {
      var closeBtn = slideout.querySelector('.editorial-slideout-close');
      if (closeBtn) closeBtn.focus();
    } else if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
      lastFocus = null;
    }
  }

  function restartTickerAnimation() {
    var flex = slideout.querySelector('.work-with-us-ticker-flex');
    if (!flex || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    flex.style.animation = 'none';
    void flex.offsetWidth;
    flex.style.animation = '';
  }

  function getExpandInner(item) {
    return item.querySelector('.work-with-us-role-expand-inner');
  }

  function getExpandEl(item) {
    return item.querySelector('.work-with-us-role-expand');
  }

  function collapseRole(item, immediate) {
    if (!item) return;

    var shell = item.querySelector('.work-with-us-role-shell');
    var triggerBtn = item.querySelector('.work-with-us-role-trigger');
    var expand = getExpandEl(item);
    var inner = getExpandInner(item);
    if (!shell || !expand || !inner) return;

    shell.classList.remove('is-open');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');
    expand.setAttribute('aria-hidden', 'true');

    if (immediate || reducedMotion) {
      expand.style.height = '0px';
      return;
    }

    if (expand.style.height === 'auto') {
      expand.style.height = inner.scrollHeight + 'px';
    }

    window.requestAnimationFrame(function () {
      expand.style.height = '0px';
    });
  }

  function expandRole(item) {
    var shell = item.querySelector('.work-with-us-role-shell');
    var triggerBtn = item.querySelector('.work-with-us-role-trigger');
    var expand = getExpandEl(item);
    var inner = getExpandInner(item);
    if (!shell || !expand || !inner) return;

    shell.classList.add('is-open');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'true');
    expand.setAttribute('aria-hidden', 'false');

    if (reducedMotion) {
      expand.style.height = 'auto';
      return;
    }

    expand.style.height = '0px';
    window.requestAnimationFrame(function () {
      expand.style.height = inner.scrollHeight + 'px';
    });

    expand.addEventListener(
      'transitionend',
      function onEnd(event) {
        if (event.propertyName !== 'height') return;
        if (!shell.classList.contains('is-open')) return;
        expand.style.height = 'auto';
        expand.removeEventListener('transitionend', onEnd);

        var nameField = item.querySelector('.work-with-us-form-input[name="name"]');
        if (nameField && typeof nameField.focus === 'function') {
          nameField.focus({ preventScroll: true });
        }
      }
    );
  }

  function closeAllRoles(immediate) {
    roleItems.forEach(function (item) {
      collapseRole(item, immediate);
    });
    openItem = null;
  }

  function resetRoleForms() {
    slideout.querySelectorAll('.work-with-us-form').forEach(function (form) {
      form.classList.remove('is-sent', 'is-submitting');
      form.reset();

      var roleField = form.querySelector('[name="role"]');
      var item = form.closest('.work-with-us-role-item');
      if (roleField && item) {
        roleField.value = item.getAttribute('data-role') || roleField.value;
      }

      var status = form.querySelector('.work-with-us-form-status');
      if (status) {
        status.hidden = true;
        status.textContent = '';
        status.classList.remove('is-success', 'is-error', 'is-loading');
      }

      var submitBtn = form.querySelector('.work-with-us-form-submit');
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  function toggleRole(item) {
    var shell = item.querySelector('.work-with-us-role-shell');
    if (!shell) return;

    var willOpen = !shell.classList.contains('is-open');

    if (openItem && openItem !== item) {
      collapseRole(openItem, false);
    }

    if (willOpen) {
      expandRole(item);
      openItem = item;
      return;
    }

    collapseRole(item, false);
    openItem = null;
  }

  function openPanel() {
    if (slideout.classList.contains('is-open')) return;
    lastFocus = document.activeElement;
    setOpen(true);
    if (window.vorenaI18n && typeof window.vorenaI18n.refresh === 'function') {
      window.vorenaI18n.refresh();
    }
    window.requestAnimationFrame(restartTickerAnimation);
  }

  function closePanel() {
    if (!slideout.classList.contains('is-open')) return;
    closeAllRoles(true);
    resetRoleForms();
    setOpen(false);
  }

  trigger.addEventListener('click', function () {
    openPanel();
  });

  var closeBtn = slideout.querySelector('.editorial-slideout-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      closePanel();
    });
  }

  roleItems.forEach(function (item) {
    var triggerBtn = item.querySelector('.work-with-us-role-trigger');
    if (!triggerBtn) return;

    triggerBtn.addEventListener('click', function () {
      toggleRole(item);
    });
  });

  slideout.addEventListener('click', function (e) {
    if (e.target.closest('[data-slideout-close]')) {
      closePanel();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && slideout.classList.contains('is-open')) {
      e.preventDefault();
      closePanel();
    }
  });

  window.addEventListener('resize', function () {
    if (!openItem) return;
    var expand = getExpandEl(openItem);
    var inner = getExpandInner(openItem);
    if (!expand || !inner) return;
    if (expand.style.height === 'auto' || expand.getAttribute('aria-hidden') === 'false') {
      expand.style.height = inner.scrollHeight + 'px';
      window.requestAnimationFrame(function () {
        expand.style.height = 'auto';
      });
    }
  });

  if (reducedMotion) {
    var panelWrap = slideout.querySelector('.editorial-slideout-panel-wrap');
    var scrim = slideout.querySelector('.editorial-slideout-scrim');
    if (panelWrap) panelWrap.style.transition = 'none';
    if (scrim) scrim.style.transition = 'none';
    slideout.querySelectorAll('.work-with-us-role-expand').forEach(function (expand) {
      expand.style.transition = 'none';
    });
  }
})();
