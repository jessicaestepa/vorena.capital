(function () {
  var STORAGE_KEY = 'vorena-lang';

  var translations = {
    en: {
      'nav.manifesto': 'Manifesto',
      'nav.companies': 'Companies',
      'nav.whosBehind': "Who's behind",
      'nav.getInTouch': 'Get in touch',
      'nav.contact': 'Contact',
      'hero.title': 'We acquire overlooked companies <span class="after-banner-title-mark">and make them unstoppable</span> with AI agents and LATAM talent.',
      'hero.titleDesktop': 'We acquire overlooked companies <span class="after-banner-title-line">\u00a0</span><span class="after-banner-title-mark">and make them unstoppable</span> with AI agents and LATAM talent.',
      'hero.subtitle': 'Technology has overlooked most of the economy. We\'re changing that',
      'hero.cta': 'Want to know more',
      'hero.ctaDesktop': 'Get Started Now',
      'hero.details': 'We <span class="banner-details-mark">acquire</span> overlooked companies and make them unstoppable with AI agents and LATAM talent.',
      'thesis.badge': 'Our thesis',
      'thesis.stat1': 'Of the economy',
      'thesis.stat2': 'Still offline',
      'thesis.title': 'We buy overlooked companies and rebuild them as <span class="about-us-title-mark">AI-native operators — powered by LATAM talent.</span>',
      'thesis.body': 'Most durable businesses still run on legacy software, manual workflows, and disconnected teams. We acquire companies in overlooked sectors, embed AI agents into daily operations, and pair them with elite operators from Latin America to unlock compounding growth.',
      'thesis.cta': 'See our companies',
      'manifesto.heading': 'MANIFESTO',
      'manifesto.p1': 'Technology has been the great enabler of human progress. The tool that has let us push past our limits and grow like never before.',
      'manifesto.p2': 'But until now that power has reached only part of the world: the deep tech niches, the big bets, the same industries as always.',
      'manifesto.p3': 'Meanwhile, the businesses that hold up the real economy are still waiting their turn. The everyday ones, where most of the talent, the opportunity, and the profit actually live.',
      'manifesto.p4': 'That\'s exactly where technology hasn\'t arrived yet, and where it can transform the most.',
      'manifesto.p5': 'At vorena we believe technology is the banner of this revolution, and that its place is in every industry, not just a few. Latin America has the world class talent to take this opportunity and bring it to global scale.',
      'manifesto.verb1': 'ACQUIRE.',
      'manifesto.verb2': 'OPERATE.',
      'manifesto.verb3': 'GROW.',
      'manifesto.support': 'Overlooked businesses, made unstoppable with AI agents and LATAM talent. That\'s our core.',
      'manifesto.investor': 'And, for those who see it early, a new way to invest in technology.',
      'manifesto.tagline': 'vorena. Where the next great value in technology is built.',
      'manifesto.signature': 'Jessica',
      'companies.headingOur': 'Our',
      'companies.headingMark': 'Companies',
      'companies.papercheck.name': 'Papercheck',
      'companies.papercheck.industry': 'Services',
      'companies.papercheck.desc': 'Expert editing for books, scientific papers, and academic writing, with a back-office optimized for human editors using AI.',
      'companies.aitextspeak.name': 'AITextSpeak',
      'companies.aitextspeak.industry': 'SaaS',
      'companies.aitextspeak.desc': 'AI voice and text tools for faster content and communication workflows.',
      'companies.stealth.name': 'In stealth',
      'companies.stealth.status': 'Soon to reveal',
      'companies.stealth.desc': 'A new company currently being built with AI agents and LATAM talent.',
      'whosBehind.headingBefore': 'Wh',
      'whosBehind.headingAfter': "'s",
      'whosBehind.headingMark': 'behind',
      'whosBehind.profileName': 'Jessica Maldonado',
      'whosBehind.subtitle': 'Founder & CEO',
      'whosBehind.card.desc': '<p>Jessica is a finance professional with 5+ years in investments and operations at high-growth companies. She started in finance, then moved into operations at Rappi, Colombia\'s first unicorn, before becoming the first employee at Latin Leap, a LATAM venture capital fund.</p><p>As Founder & CEO of vorena capital, she acquires traditional businesses and scales them with technology. She\'s also an angel investor. Colombian operator based in Mexico City.</p>',
      'whosBehind.linkedinAria': 'View Jessica Maldonado on LinkedIn',
      'whosBehind.githubAria': 'View Jessica Estepa on GitHub',
      'footer.tagline': 'vorena builds and operates AI-native companies.',
      'footer.pagesTitle': 'Pages',
      'footer.locationTitle': 'Location',
      'footer.contactTitle': 'Contact',
      'footer.locationText': 'Mexico City, Mexico',
      'footer.email': 'hello@vorenacapital.com',
      'footer.social.linkedin': 'LinkedIn',
      'footer.copyright': '© 2026 vorena capital',
      'getInTouch.heading': 'GET IN TOUCH',
      'getInTouch.business.title': 'I own a business',
      'getInTouch.business.desc': "You're a founder or owner curious what vorena could do with your company.",
      'getInTouch.connect.title': 'I want to know more about vorena',
      'getInTouch.connect.desc': "You're curious how we acquire, operate, and grow.",
      'contactIntent.back': '← Back to home',
      'contactIntent.formTitle': 'Start the conversation',
      'contactIntent.business.eyebrow': 'Business inquiry',
      'contactIntent.business.displayLine1': 'Tell us',
      'contactIntent.business.displayLine2': 'about your business.',
      'contactIntent.business.title': 'Tell us about your business',
      'contactIntent.business.lead': "Share a few details and we'll follow up about what vorena could do with your company.",
      'contactIntent.business.point1': 'For founders and owners exploring a sale or partnership',
      'contactIntent.business.point2': 'Confidential, we typically reply within a few days',
      'contactIntent.connect.eyebrow': 'General inquiry',
      'contactIntent.connect.displayLine1': 'Connect',
      'contactIntent.connect.displayLine2': 'with vorena.',
      'contactIntent.connect.title': 'Connect with vorena',
      'contactIntent.connect.lead': "Tell us what you'd like to learn about how we build, acquire, and operate.",
      'contactIntent.connect.point1': 'For investors, operators, and partners curious about our model',
      'contactIntent.connect.point2': 'Learn how vorena acquires and scales with AI + LATAM talent',
      'contactIntent.connect.point3': "We'll point you to the right conversation",
      'contactIntent.nameLabel': 'Name',
      'contactIntent.emailLabel': 'Email',
      'contactIntent.companyLabel': 'Company',
      'contactIntent.messageLabel': 'Message',
      'contactIntent.submit': 'Send message',
      'contactIntent.sending': 'Sending…',
      'contactIntent.success': "Thanks — we received your message and will reply soon.",
      'contactIntent.error': 'Something went wrong. Please try again or email jessica@vorena.capital.',
      'contactIntent.errorConfig': 'Form is not connected yet. Please email jessica@vorena.capital.'
    },
    es: {
      'nav.manifesto': 'Manifiesto',
      'nav.companies': 'Empresas',
      'nav.whosBehind': 'Equipo',
      'nav.getInTouch': 'Contáctanos',
      'nav.contact': 'Contacto',
      'hero.title': 'Adquirimos empresas pasadas por alto <span class="after-banner-title-mark">y las volvemos imparables</span> con agentes de IA y talento LATAM.',
      'hero.titleDesktop': 'Adquirimos empresas pasadas por alto <span class="after-banner-title-line">\u00a0</span><span class="after-banner-title-mark">y las volvemos imparables</span> con agentes de IA y talento LATAM.',
      'hero.subtitle': 'La tecnología ha pasado por alto la mayor parte de la economía. Estamos cambiando eso.',
      'hero.cta': 'Quiero saber más',
      'hero.ctaDesktop': 'Empezar ahora',
      'hero.details': '<span class="banner-details-mark">Adquirimos</span> empresas pasadas por alto y las volvemos imparables con agentes de IA y talento LATAM.',
      'thesis.badge': 'Nuestra tesis',
      'thesis.stat1': 'De la economía',
      'thesis.stat2': 'Aún offline',
      'thesis.title': 'Compramos empresas pasadas por alto y las reconstruimos como <span class="about-us-title-mark">operadores nativos de IA — impulsados por talento LATAM.</span>',
      'thesis.body': 'La mayoría de los negocios duraderos aún operan con software legacy, procesos manuales y equipos desconectados. Adquirimos empresas en sectores pasados por alto, integramos agentes de IA en las operaciones diarias y las combinamos con operadores de élite en Latinoamérica para desbloquear crecimiento compuesto.',
      'thesis.cta': 'Ver nuestras empresas',
      'manifesto.heading': 'MANIFIESTO',
      'manifesto.p1': 'La tecnología ha sido el gran habilitador del progreso humano. La herramienta que nos ha permitido superar nuestros límites y crecer como nunca antes.',
      'manifesto.p2': 'Pero hasta hoy ese poder ha tocado solo una parte del mundo: los nichos de deep tech, las grandes apuestas, las mismas industrias de siempre.',
      'manifesto.p3': 'Mientras tanto, los negocios que sostienen la economía real siguen esperando su turno. Los del día a día, donde se concentran la mayor parte del talento, las oportunidades y la rentabilidad.',
      'manifesto.p4': 'Ahí es justo donde la tecnología aún no ha llegado, y donde más puede transformar.',
      'manifesto.p5': 'En vorena creemos que la tecnología es la bandera de esta revolución, y que su lugar está en todas las industrias, no solo en unas cuantas. Latinoamérica tiene el talento de clase mundial para tomar esta oportunidad y llevarla a escala global.',
      'manifesto.verb1': 'ADQUIRIR.',
      'manifesto.verb2': 'OPERAR.',
      'manifesto.verb3': 'CRECER.',
      'manifesto.support': 'Negocios overlooked, imparables con agentes de IA y talento LATAM. Ese es nuestro core.',
      'manifesto.investor': 'Y, para quienes lo ven a tiempo, una nueva forma de invertir en tecnología.',
      'manifesto.tagline': 'vorena. Donde se construye el próximo gran valor de la tecnología.',
      'manifesto.signature': 'Jessica',
      'companies.headingOur': 'Nuestras',
      'companies.headingMark': 'Empresas',
      'companies.papercheck.name': 'Papercheck',
      'companies.papercheck.industry': 'Servicios',
      'companies.papercheck.desc': 'Empresa de revisión humana de documentos científicos, publicaciones periodísticas y libros',
      'companies.aitextspeak.name': 'AITextSpeak',
      'companies.aitextspeak.industry': 'SaaS',
      'companies.aitextspeak.desc': 'Plataforma de texto a voz enfocada en el nicho de creación de contenido',
      'companies.stealth.name': 'En stealth',
      'companies.stealth.status': 'Próximamente',
      'companies.stealth.desc': 'Nuestra próxima adquisición, en proceso.',
      'whosBehind.headingBefore': 'EQUIP',
      'whosBehind.headingAfter': '',
      'whosBehind.headingMark': '',
      'whosBehind.profileName': 'Jessica Maldonado',
      'whosBehind.subtitle': 'Fundadora y CEO',
      'whosBehind.card.desc': '<p>Jessica es una profesional de finanzas con más de 5 años en inversiones y operaciones en empresas de alto crecimiento. Empezó en finanzas, luego pasó a operaciones en Rappi, el primer unicornio de Colombia, antes de ser la primera empleada en Latin Leap, un fondo de venture capital en LATAM.</p><p>Como Fundadora y CEO de vorena capital, adquiere negocios tradicionales y los escala con tecnología. También es inversionista ángel. Operadora colombiana con base en Ciudad de México.</p>',
      'whosBehind.linkedinAria': 'Ver a Jessica Maldonado en LinkedIn',
      'whosBehind.githubAria': 'Ver a Jessica Estepa en GitHub',
      'footer.tagline': 'vorena construye y opera empresas nativas de IA.',
      'footer.pagesTitle': 'Páginas',
      'footer.locationTitle': 'Ubicación',
      'footer.contactTitle': 'Contacto',
      'footer.locationText': 'Ciudad de México, México',
      'footer.email': 'hello@vorenacapital.com',
      'footer.social.linkedin': 'LinkedIn',
      'footer.copyright': '© 2026 vorena capital',
      'getInTouch.heading': 'CONTÁCTANOS',
      'getInTouch.business.title': 'Tengo una empresa',
      'getInTouch.business.desc': 'Eres founder o dueño y quieres saber qué podría hacer vorena por tu empresa.',
      'getInTouch.connect.title': 'Quiero saber más sobre vorena',
      'getInTouch.connect.desc': 'Quieres saber más sobre cómo adquirimos, operamos y hacemos crecer compañías.',
      'contactIntent.back': '← Volver al inicio',
      'contactIntent.formTitle': 'Inicia la conversación',
      'contactIntent.business.eyebrow': 'Consulta de negocio',
      'contactIntent.business.displayLine1': 'Cuéntanos',
      'contactIntent.business.displayLine2': 'sobre tu negocio.',
      'contactIntent.business.title': 'Cuéntanos sobre tu negocio',
      'contactIntent.business.lead': 'Comparte algunos detalles y te contactaremos sobre lo que vorena podría hacer con tu empresa.',
      'contactIntent.business.point1': 'Para fundadores y dueños que exploran una venta o alianza',
      'contactIntent.business.point2': 'Confidencial, solemos responder en pocos días',
      'contactIntent.connect.eyebrow': 'Consulta general',
      'contactIntent.connect.displayLine1': 'Conecta',
      'contactIntent.connect.displayLine2': 'con vorena.',
      'contactIntent.connect.title': 'Conecta con vorena',
      'contactIntent.connect.lead': 'Cuéntanos qué te gustaría aprender sobre cómo construimos, adquirimos y operamos.',
      'contactIntent.connect.point1': 'Para inversionistas, operadores y aliados curiosos sobre nuestro modelo',
      'contactIntent.connect.point2': 'Aprende cómo vorena adquiere y escala con IA + talento LATAM',
      'contactIntent.connect.point3': 'Te conectaremos con la conversación correcta',
      'contactIntent.nameLabel': 'Nombre',
      'contactIntent.emailLabel': 'Correo',
      'contactIntent.companyLabel': 'Empresa',
      'contactIntent.messageLabel': 'Mensaje',
      'contactIntent.submit': 'Enviar mensaje',
      'contactIntent.sending': 'Enviando…',
      'contactIntent.success': 'Gracias — recibimos tu mensaje y te responderemos pronto.',
      'contactIntent.error': 'Algo salió mal. Intenta de nuevo o escribe a jessica@vorena.capital.',
      'contactIntent.errorConfig': 'El formulario aún no está conectado. Escribe a jessica@vorena.capital.'
    }
  };

  window.vorenaI18n = {
    getLang: getLang,
    t: function (key) {
      var lang = getLang();
      var strings = translations[lang] || translations.en;
      return strings[key] || translations.en[key] || '';
    }
  };

  function getLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'es' ? 'es' : 'en';
  }

  function applyLang(lang) {
    var strings = translations[lang] || translations.en;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!Object.prototype.hasOwnProperty.call(strings, key)) return;
      var value = strings[key];

      if (el.getAttribute('data-i18n-mode') === 'html') {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      var value = strings[key];
      if (value) el.setAttribute('aria-label', value);
    });

    document.dispatchEvent(
      new CustomEvent('vorena:lang-change', { detail: { lang: lang } })
    );
  }

  function updateSwitch(lang) {
    document.querySelectorAll('.lang-switch-btn').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'es') lang = 'en';
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
    updateSwitch(lang);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-switch-btn');
    if (!btn) return;
    setLang(btn.getAttribute('data-lang'));
  });

  setLang(getLang());
})();
