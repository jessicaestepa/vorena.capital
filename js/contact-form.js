(function () {
  var HONEYPOT_NAME = '_gotcha';
  var FORM_SELECTOR = '.contact-intent-form[data-intent], .work-with-us-form[data-intent]';

  function getConfig() {
    var cfg = window.VORENA_SUPABASE;
    if (!cfg || !cfg.url || !cfg.anonKey) return null;
    if (String(cfg.url).indexOf('YOUR_') !== -1) return null;
    if (String(cfg.anonKey).indexOf('YOUR_') !== -1) return null;
    if (String(cfg.anonKey).indexOf('sb_secret_') === 0) return null;
    return {
      url: String(cfg.url).replace(/\/$/, ''),
      anonKey: String(cfg.anonKey),
      table: cfg.table || 'contact_submissions'
    };
  }

  function t(key) {
    if (window.vorenaI18n && typeof window.vorenaI18n.t === 'function') {
      return window.vorenaI18n.t(key);
    }
    return key;
  }

  function isWorkWithUsForm(form) {
    return form.classList.contains('work-with-us-form');
  }

  function statusEl(form) {
    return (
      form.querySelector('.work-with-us-form-status') ||
      form.querySelector('.contact-intent-form-status')
    );
  }

  function submitBtn(form) {
    return (
      form.querySelector('.work-with-us-form-submit') ||
      form.querySelector('.contact-intent-submit')
    );
  }

  function submitTextEl(form) {
    return (
      form.querySelector('.work-with-us-form-submit-text') ||
      form.querySelector('.contact-intent-submit-text')
    );
  }

  function submitLabel(form, isSubmitting) {
    if (isSubmitting) return t('contactIntent.sending');
    if (isWorkWithUsForm(form)) return t('getInTouch.workWithUs.panelCta');
    return t('contactIntent.submit');
  }

  function setStatus(form, type, message) {
    var status = statusEl(form);
    if (!status) return;
    status.hidden = !message;
    status.textContent = message || '';
    status.classList.remove('is-success', 'is-error', 'is-loading');
    if (type) status.classList.add(type);
  }

  var toastTimer = null;
  var toastEl = null;

  function ensureToast() {
    if (toastEl) return toastEl;
    var host = document.createElement('div');
    host.className = 'vorena-form-toast-host';
    host.setAttribute('aria-live', 'polite');
    host.setAttribute('aria-atomic', 'true');
    document.body.appendChild(host);
    toastEl = document.createElement('div');
    toastEl.className = 'vorena-form-toast';
    toastEl.setAttribute('role', 'status');
    toastEl.hidden = true;
    toastEl.innerHTML =
      '<span class="vorena-form-toast-icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M3.5 8.25L6.5 11.25L12.5 4.75" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg></span>' +
      '<span class="vorena-form-toast-text"></span>';
    host.appendChild(toastEl);
    return toastEl;
  }

  function hideSuccessToast() {
    if (!toastEl) return;
    toastEl.classList.remove('is-visible');
    toastEl.classList.add('is-hiding');
    window.setTimeout(function () {
      if (!toastEl) return;
      toastEl.hidden = true;
      toastEl.classList.remove('is-hiding');
    }, 280);
  }

  function showSuccessToast(message) {
    var el = ensureToast();
    var text = el.querySelector('.vorena-form-toast-text');
    if (text) text.textContent = message;
    el.hidden = false;
    el.classList.remove('is-hiding');
    window.requestAnimationFrame(function () {
      el.classList.add('is-visible');
    });
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(hideSuccessToast, 3200);
  }

  function setSubmitting(form, isSubmitting) {
    var btn = submitBtn(form);
    form.classList.toggle('is-submitting', isSubmitting);
    if (btn) {
      btn.disabled = isSubmitting;
      var text = submitTextEl(form);
      if (text) text.textContent = submitLabel(form, isSubmitting);
    }
  }

  function fieldValue(form, name) {
    var el = form.elements.namedItem(name);
    if (!el || el.type === 'file') return '';
    return String(el.value || '').trim();
  }

  function buildPayload(form) {
    var intent = form.getAttribute('data-intent') || 'connect';
    var payload = {
      intent: intent,
      name: fieldValue(form, 'name'),
      email: fieldValue(form, 'email'),
      company: fieldValue(form, 'company') || null,
      message: fieldValue(form, 'message'),
      locale: document.documentElement.lang || 'en',
      page_path: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null
    };

    if (intent === 'talent') {
      payload.role = fieldValue(form, 'role') || null;
    }

    return payload;
  }

  function submitToSupabase(cfg, payload) {
    var endpoint = cfg.url + '/rest/v1/' + encodeURIComponent(cfg.table);
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: cfg.anonKey,
        Authorization: 'Bearer ' + cfg.anonKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var cfg = getConfig();

    if (fieldValue(form, HONEYPOT_NAME)) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (isWorkWithUsForm(form) && !fieldValue(form, 'role')) {
      setStatus(form, 'is-error', t('getInTouch.workWithUs.selectRoleError'));
      return;
    }

    if (!cfg) {
      setStatus(form, 'is-error', t('contactIntent.errorConfig'));
      return;
    }

    setStatus(form, 'is-loading', t('contactIntent.sending'));
    setSubmitting(form, true);

    submitToSupabase(cfg, buildPayload(form))
      .then(function (response) {
        if (!response.ok) {
          return response.text().then(function (body) {
            var err = new Error('Supabase insert failed');
            err.detail = body;
            throw err;
          });
        }
        setStatus(form, null, '');
        showSuccessToast(t('contactIntent.successToast'));
        var selectedRole = isWorkWithUsForm(form) ? fieldValue(form, 'role') : '';
        form.reset();
        if (selectedRole) {
          var roleField = form.elements.namedItem('role');
          if (roleField) roleField.value = selectedRole;
        }
        form.classList.add('is-sent');
      })
      .catch(function (err) {
        if (typeof console !== 'undefined' && console.error) {
          console.error('Contact form submit failed:', err && err.detail ? err.detail : err);
        }
        setStatus(form, 'is-error', t('contactIntent.error'));
      })
      .finally(function () {
        setSubmitting(form, false);
      });
  }

  function init() {
    document.querySelectorAll(FORM_SELECTOR).forEach(function (form) {
      form.setAttribute('action', '');
      form.setAttribute('method', 'post');
      form.removeAttribute('enctype');
      form.addEventListener('submit', onSubmit);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
