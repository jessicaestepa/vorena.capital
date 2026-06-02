(function () {
  var STORAGE_KEY = 'vorena-lang';

  var translations = {
    en: {
      'nav.manifesto': 'Manifesto',
      'nav.companies': 'Companies',
      'nav.whosBehind': "Who's behind",
      'nav.getInTouch': 'Get in touch',
      'nav.openRoles': 'Open roles',
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
      'whosBehind.card.eyebrow': 'FOUNDER',
      'whosBehind.subtitle': 'Founder & CEO',
      'whosBehind.card.desc': '<p>I learned how companies actually work operating at Rappi, then built a fund from scratch as the first hire at Latin Leap. Then I stopped advising and started buying, acquiring and transforming two companies with my own capital, and building the AI tools myself.</p>',
      'whosBehind.card.personal': 'Marathoner and triathlete. Serial matcha taster. A believer that the best operators come from LATAM.',
      'whosBehind.linkedinAria': 'View Jessica Maldonado on LinkedIn',
      'whosBehind.githubAria': 'View Jessica Estepa on GitHub',
      'footer.tagline': 'vorena acquires, operates, and grows overlooked companies.',
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
      'getInTouch.workWithUs.barLabel': 'Want to w<span class="work-bar-vorena-o" aria-hidden="true"><span class="work-bar-vorena-o-ring"><span class="work-bar-vorena-o-fill"></span></span></span>rk with us?',
      'getInTouch.workWithUs.barLabelAria': 'Want to work with us?',
      'getInTouch.workWithUs.panelTitle': 'Work with us',
      'getInTouch.workWithUs.body.p1': 'We\'re looking for <span class="work-with-us-body-accent">operators</span>. People who\'d rather learn by doing than just analyzing.',
      'getInTouch.workWithUs.body.p2': 'Overachievers who are genuinely driven and already know a thing or two about business, finance, and tech. We love people who are intellectually pliable and weirdly self-motivated.',
      'getInTouch.workWithUs.body.p3': "We have a soft spot for those with a high tolerance for discomfort (athletes, or anyone who's played sports seriously), who've written interesting opinions about things, who are honest, funny, confident but humble. People who believe in the talent and potential of LATAM, and who tinker with AI almost daily (share your GitHub ;)).",
      'getInTouch.workWithUs.body.p4': 'And above all, people who <span class="work-with-us-body-accent">believe what we believe</span>: that <span class="work-with-us-body-accent">technology is the great enabler of global growth</span>, and that bringing it into overlooked businesses is <span class="work-with-us-body-accent">where the next explosion of value is hiding</span>.',
      'getInTouch.workWithUs.body.p5': "You don't need all of this. But if you've got some of it, let's talk.",
      'getInTouch.workWithUs.openRoles': 'Open roles',
      'getInTouch.workWithUs.roleSerial1': 'Role 01',
      'getInTouch.workWithUs.roleSerial2': 'Role 02',
      'getInTouch.workWithUs.roleSerial3': 'Role 03',
      'getInTouch.workWithUs.roleApplyTitle': 'Apply for this role',
      'getInTouch.workWithUs.roleApplyLead': 'Tell us about yourself and why you\'d be a fit.',
      'getInTouch.workWithUs.panelCta': 'Get in touch',
      'getInTouch.workWithUs.formName': 'Name',
      'getInTouch.workWithUs.formEmail': 'Email',
      'getInTouch.workWithUs.formMessage': 'A few words',
      'getInTouch.workWithUs.formMessagePlaceholder': "LinkedIn, GitHub, or why you'd be a fit",
      'getInTouch.workWithUs.formRoleLabel': 'Applying for {{role}}',
      'getInTouch.workWithUs.selectRoleError': 'Select a role above to continue.',
      'getInTouch.workWithUs.closeAria': 'Close panel',
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
      'contactIntent.successToast': 'Sent!',
      'contactIntent.error': 'Something went wrong. Please try again or email jessica@vorena.capital.',
      'contactIntent.errorConfig': 'Form is not connected yet. Please email jessica@vorena.capital.'
    },
    es: {
      'nav.manifesto': 'Manifiesto',
      'nav.companies': 'Empresas',
      'nav.whosBehind': 'Equipo',
      'nav.getInTouch': 'Contáctanos',
      'nav.openRoles': 'Posiciones abiertas',
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
      'whosBehind.card.eyebrow': 'FUNDADORA',
      'whosBehind.subtitle': 'Fundadora y CEO',
      'whosBehind.card.desc': '<p>Aprendí cómo funcionan de verdad las empresas operando en Rappi, y luego construí un fondo desde cero como primera contratación en Latin Leap. Después dejé de asesorar y empecé a comprar: adquirí y transformé dos empresas con mi propio capital, y construí yo misma las herramientas de IA.</p>',
      'whosBehind.card.personal': 'Maratonista y triatleta. Catadora serial de matcha. Convencida de que los mejores operadores salen de LATAM.',
      'whosBehind.linkedinAria': 'Ver a Jessica Maldonado en LinkedIn',
      'whosBehind.githubAria': 'Ver a Jessica Estepa en GitHub',
      'footer.tagline': 'vorena adquiere, opera y hace crecer compañías overlooked.',
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
      'getInTouch.workWithUs.barLabel': '¿Quieres trabajar con n<span class="work-bar-vorena-o" aria-hidden="true"><span class="work-bar-vorena-o-ring"><span class="work-bar-vorena-o-fill"></span></span></span>sotros?',
      'getInTouch.workWithUs.barLabelAria': '¿Quieres trabajar con nosotros?',
      'getInTouch.workWithUs.panelTitle': 'Trabaja con nosotros',
      'getInTouch.workWithUs.body.p1': 'Buscamos <span class="work-with-us-body-accent">operadores</span>. Gente que prefiere probar haciendo y no solo analizar.',
      'getInTouch.workWithUs.body.p2': 'Overachievers de verdad motivados, que ya saben una que otra cosa sobre negocios, finanzas y tech. Nos encanta la gente intelectualmente flexible y raramente automotivada.',
      'getInTouch.workWithUs.body.p3': 'Tenemos preferencia por quienes tienen alta tolerancia a la incomodidad (atletas, o que han practicado deportes en serio), que han escrito opiniones interesantes sobre las cosas, que son honestos, divertidos, seguros pero humildes. Gente que cree en el talento y el potencial de LATAM, y que juega con IA casi a diario (comparte tu GitHub ;)).',
      'getInTouch.workWithUs.body.p4': 'Y sobre todo, gente que <span class="work-with-us-body-accent">cree lo que nosotros creemos</span>: que <span class="work-with-us-body-accent">la tecnología es el gran habilitador del crecimiento global</span>, y que usarla en los negocios que han sido pasados por alto es <span class="work-with-us-body-accent">donde está la próxima explosión de valor</span>.',
      'getInTouch.workWithUs.body.p5': 'No necesitas tener todo esto. Pero si tienes algo, hablemos.',
      'getInTouch.workWithUs.openRoles': 'Posiciones abiertas',
      'getInTouch.workWithUs.roleSerial1': 'Rol 01',
      'getInTouch.workWithUs.roleSerial2': 'Rol 02',
      'getInTouch.workWithUs.roleSerial3': 'Rol 03',
      'getInTouch.workWithUs.roleApplyTitle': 'Postular a este rol',
      'getInTouch.workWithUs.roleApplyLead': 'Cuéntanos sobre ti y por qué encajarías.',
      'getInTouch.workWithUs.panelCta': 'Escríbenos',
      'getInTouch.workWithUs.formName': 'Nombre',
      'getInTouch.workWithUs.formEmail': 'Correo',
      'getInTouch.workWithUs.formMessage': 'Unas palabras',
      'getInTouch.workWithUs.formMessagePlaceholder': 'LinkedIn, GitHub o por qué encajarías',
      'getInTouch.workWithUs.formRoleLabel': 'Postulando a {{role}}',
      'getInTouch.workWithUs.selectRoleError': 'Elige una posición arriba para continuar.',
      'getInTouch.workWithUs.closeAria': 'Cerrar panel',
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
      'contactIntent.successToast': '¡Enviado!',
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
    },
    refresh: function () {
      applyLang(getLang());
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

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (!Object.prototype.hasOwnProperty.call(strings, key)) return;
      el.setAttribute('placeholder', strings[key]);
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
