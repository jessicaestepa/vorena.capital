(function () {
  var HONEYPOT_NAME = '_gotcha';

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

  function setStatus(form, type, message) {
    var status = form.querySelector('.contact-intent-form-status');
    if (!status) return;
    status.hidden = !message;
    status.textContent = message || '';
    status.classList.remove('is-success', 'is-error', 'is-loading');
    if (type) status.classList.add(type);
  }

  function setSubmitting(form, isSubmitting) {
    var btn = form.querySelector('.contact-intent-submit');
    form.classList.toggle('is-submitting', isSubmitting);
    if (btn) {
      btn.disabled = isSubmitting;
      var text = btn.querySelector('.contact-intent-submit-text');
      if (text) {
        text.textContent = isSubmitting
          ? t('contactIntent.sending')
          : t('contactIntent.submit');
      }
    }
  }

  function fieldValue(form, name) {
    var el = form.elements.namedItem(name);
    if (!el || el.type === 'file') return '';
    return String(el.value || '').trim();
  }

  function buildPayload(form) {
    var intent = form.getAttribute('data-intent') || 'connect';
    return {
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
        setStatus(form, 'is-success', t('contactIntent.success'));
        form.reset();
        form.classList.add('is-sent');
      })
      .catch(function () {
        setStatus(form, 'is-error', t('contactIntent.error'));
      })
      .finally(function () {
        setSubmitting(form, false);
      });
  }

  function init() {
    document.querySelectorAll('.contact-intent-form[data-intent]').forEach(function (form) {
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
