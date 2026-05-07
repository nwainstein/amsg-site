const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

const updateTechnionLogo = () => {
  const techImg = document.querySelector('.technion-logo');
  if (!techImg) return;
  const isDark = document.body.classList.contains('a11y-high-contrast');
  techImg.src = isDark
    ? 'assets/img/logo_technion_white.svg'
    : 'assets/img/logo_technion.svg';
};

updateTechnionLogo();

const SITE_SEARCH_PAGES = [
  {
    href: 'index.html',
    title: 'Home',
    keywords: [
      'amsg',
      'analog mixed signal research group',
      'technion',
      'home',
      'overview',
      'vision',
      'ai hardware'
    ]
  },
  {
    href: 'research.html',
    title: 'Research',
    keywords: [
      'research',
      'projects',
      'time-domain computing',
      'in-memory computing',
      'chip gallery',
      'expertise'
    ]
  },
  {
    href: 'publications.html',
    title: 'Publications',
    keywords: [
      'publications',
      'papers',
      'journals',
      'conferences',
      'talks',
      'preprints'
    ]
  },
  {
    href: 'people.html',
    title: 'People',
    keywords: [
      'people',
      'team',
      'students',
      'researchers',
      'faculty',
      'collaborators'
    ]
  },
  {
    href: 'news.html',
    title: 'News',
    keywords: [
      'news',
      'updates',
      'events',
      'awards',
      'announcements'
    ]
  },
  {
    href: 'contact.html',
    title: 'Contact',
    keywords: [
      'contact',
      'email',
      'office',
      'join',
      'location'
    ]
  },
  {
    href: 'accessibility-information.html',
    title: 'Accessibility',
    keywords: [
      'accessibility',
      'accessibility information',
      'accessibility statement',
      'hebrew',
      'נגישות',
      'הצהרת נגישות',
      'מידע על נגישות'
    ]
  }
];

const SITE_SEARCH_SNIPPET_LENGTH = 170;

const normalizeWhitespace = (value = '') => value.replace(/\s+/g, ' ').trim();
const normalizeSearchValue = (value) => normalizeWhitespace(value).toLowerCase();
const normalizePathname = (pathname) => {
  const normalized = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  return normalized.replace(/^\.\//, '');
};
const getPageKey = (pathname) => {
  const normalized = normalizePathname(pathname || '');
  const segments = normalized.split('/').filter(Boolean);
  return segments.length ? segments[segments.length - 1] : 'index.html';
};
const CURRENT_PAGE_KEY = getPageKey(window.location.pathname);

const highlightSearchQuery = (query) => {
  if (!query || typeof window.find !== 'function') return;

  window.setTimeout(() => {
    window.find(query, false, false, true, false, true, false);
  }, 150);
};

const getSearchSnippet = (text, query) => {
  const cleanText = normalizeWhitespace(text);
  if (!cleanText) return '';

  const normalizedText = cleanText.toLowerCase();
  const normalizedQuery = normalizeSearchValue(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  let matchIndex = normalizedText.indexOf(normalizedQuery);

  if (matchIndex < 0) {
    matchIndex = terms.reduce((bestIndex, term) => {
      const termIndex = normalizedText.indexOf(term);
      if (termIndex < 0) return bestIndex;
      if (bestIndex < 0) return termIndex;
      return Math.min(bestIndex, termIndex);
    }, -1);
  }

  if (matchIndex < 0) {
    return cleanText.length > SITE_SEARCH_SNIPPET_LENGTH
      ? `${cleanText.slice(0, SITE_SEARCH_SNIPPET_LENGTH).trim()}...`
      : cleanText;
  }

  const start = Math.max(0, matchIndex - 50);
  const end = Math.min(cleanText.length, start + SITE_SEARCH_SNIPPET_LENGTH);
  const snippet = cleanText.slice(start, end).trim();
  return `${start > 0 ? '...' : ''}${snippet}${end < cleanText.length ? '...' : ''}`;
};

const escapeHtml = (value = '') => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const createSearchChunk = ({
  pageHref,
  pageTitle,
  title,
  text,
  keywords = [],
  anchor = '',
  kind = 'detail'
}) => {
  const normalizedText = normalizeWhitespace(text);
  if (!normalizedText) return null;

  return {
    pageHref,
    pageTitle,
    title: normalizeWhitespace(title) || pageTitle,
    text: normalizedText,
    keywords,
    anchor,
    kind
  };
};

const collectSearchText = (element) => {
  if (!element) return '';

  const clone = element.cloneNode(true);
  clone.querySelectorAll('script, style, button, .sr-only').forEach((node) => {
    node.remove();
  });

  return normalizeWhitespace(clone.textContent || '');
};

const createStaticSearchChunks = () => {
  const rawChunks = [
    {
      pageHref: 'index.html',
      pageTitle: 'Home',
      title: 'Home',
      text: `
        Analog Mixed Signal Research Group at the Technion. Device-to-system approach, energy-efficient AI hardware,
        experimental focus, research vision, analog and mixed-signal computing, in-memory computing, short-reach high-speed interconnects,
        cross-layer methodology, research grounded in silicon, energy-efficient AI hardware, meet our team, latest news from AMSG,
        recent publications snapshot, join the group, circuits, AI hardware, wireline links.
      `,
      kind: 'page'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Research',
      text: `
        Advancing next-generation AI hardware by bridging device, circuit, and system innovations.
        In-Memory Computing, AI Hardware Accelerators, Data Converters, Clock Generation Circuits, Ultra-Dense D2D and C2C Links,
        undergraduate project opportunities, core AMS foundations, chip gallery.
      `,
      kind: 'page'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'In-Memory Computing',
      text: 'Architectures and macros that reduce data movement by co-locating storage and computation, including mixed-signal and time-domain interfaces, non-volatile memory technologies, and algorithm-aware design tradeoffs.',
      anchor: 'research-areas',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'AI Hardware Accelerators',
      text: 'Custom accelerator architectures for ANN and neuromorphic workloads spanning circuit techniques, compute macros, and system-level integration with mixed-signal and time-domain approaches.',
      anchor: 'research-areas',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Data Converters',
      text: 'Mixed-signal interfaces across voltage, current, digital, and time domains, including ADC/DAC architectures, voltage-to-time and time-to-digital techniques, and calibration tradeoffs.',
      anchor: 'research-areas',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Clock Generation Circuits',
      text: 'Timing-generation and synchronization circuits for mixed-signal, compute, and high-speed link applications with robust synthesis, phase alignment, deskew, and low-jitter operation.',
      anchor: 'research-areas',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Ultra-Dense D2D & C2C Links',
      text: 'Short-reach transceivers, chiplet systems, dense integration, inverter-based and low-swing short-reach links, clocking, forwarding strategies, equalization, design-for-test.',
      anchor: 'research-areas',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'FeFET-Based Time-Domain Compute-in-Memory BNN Accelerator Backend Design with MIPS/RISC-V Integration',
      text: 'Undergraduate project. Supervisor Jeries Mattar. Open project on backend design, MIPS, RISC-V, FeFET, time-domain compute-in-memory, binary neural networks accelerator.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Simulator for Time-Domain Compute-in-Memory ANN Accelerators',
      text: 'Undergraduate project. Supervisor Jeries Mattar. Open project on simulator for time-domain compute-in-memory ANN accelerators, performance, accuracy, architecture tradeoffs.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'FeFET-based Ring Oscillator in 28 nm CMOS',
      text: 'Undergraduate project. Supervisor Jeries Mattar. Open project on FeFET-based ring oscillator, 28 nm CMOS, timing behavior, device-aware design, characterization.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Design of Serial Peripheral Interface (SPI) for an Artificial Neural Network Accelerator in 180 nm CMOS',
      text: 'Undergraduate project. Supervisor Dr. Nicolas Wainstein. Taken project on SPI communication interface for a 180 nm CMOS neural-network accelerator.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Design of a Parallel Interface for an Artificial Neural Network Accelerator in 180 nm',
      text: 'Undergraduate project. Supervisor Dr. Nicolas Wainstein. Closed project on a parallel data interface for an artificial neural network accelerator in 180 nm.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Controller for FeFET-Based Time-Domain Compute-in-Memory Binary Neural Networks Accelerator',
      text: 'Undergraduate project. Supervisor Jeries Mattar. Taken project on controller design for FeFET-based time-domain compute-in-memory binary neural networks accelerator.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'FeFET-Based Time-Domain Compute-in-Memory Logic Design and MAC Implementation',
      text: 'Undergraduate project. Supervisor Jeries Mattar. Taken project on logic design and MAC implementation for FeFET-based time-domain compute-in-memory.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Design of Voltage-to-Time Converter for Y-Flash Based Time-Domain Compute-in-Memory ANN Accelerator',
      text: 'Undergraduate project. Supervisor Jeries Mattar. Taken project on a voltage-to-time converter for Y-Flash based time-domain compute-in-memory ANN accelerator.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'FeFET-Based Time-Domain Compute-in-Memory Backend Design',
      text: 'Undergraduate project. Supervisor Jeries Mattar. Taken backend design project for a FeFET-based time-domain compute-in-memory architecture.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Design of Time to Digital Converter with Delay-Locked Loop',
      text: 'Undergraduate project. Supervisor Jeries Mattar. Taken project on time-to-digital converter architecture with delay-locked loop, timing circuits and calibration.',
      anchor: 'undergraduate-projects',
      kind: 'detail'
    },
    {
      pageHref: 'research.html',
      pageTitle: 'Research',
      title: 'Core AMS foundations behind the projects',
      text: 'Time as a computational primitive, memory-compute co-design, silicon-first research approach, prototyping, validation, realistic system constraints.',
      anchor: 'expertise',
      kind: 'section'
    },
    {
      pageHref: 'publications.html',
      pageTitle: 'Publications',
      title: 'Publications',
      text: `
        Journals, conferences, talks.
        Reconfigurable Time-Domain In-Memory Computing Macro using CAM FeFET with Multilevel Delay Calibration in 28-nm CMOS.
        Fast-Locking and High-Resolution DLL with Binary Search and Clock Failure Detection for Wide Frequency Ranges in 3-nm FinFET CMOS.
        Emerging memory electronics for non-volatile radiofrequency switching technologies.
        Nanoscale temperature sensing of electronic devices with calibrated scanning thermal microscopy.
        Monolayer molybdenum disulfide switches for 6G communication systems.
        Stateful Logic using Phase Change Memory.
        Sub-Nanosecond Pulses Enable Partial Reset for Analog Phase Change Memory.
        Indirectly Heated Switch as a Platform for Nanosecond Probing of Phase Transition Properties in Chalcogenides.
        Uncovering Phase Change Memory Energy Limits by Sub-Nanosecond Probing of Power Dissipation Dynamics.
        Radio Frequency Switches Based on Emerging Resistive Memory Technologies: A Survey.
        Compact Modeling and Electro-thermal Measurements of Indirectly-Heated Phase Change RF Switches.
        Two-terminal floating-gate transistors with a low-power memristive operation mode for analogue neuromorphic computing.
        Adaptive Programming in Multi-Level Cell ReRAM.
        Breaking Through the Speed-Power-Accuracy Tradeoff in ADCs using a Memristive Neuromorphic Architecture.
        A Lumped RF Model for Nanoscale Memristive Devices and Non-Volatile Single-Pole Double-Throw Switches.
        TIME Tunable Inductors using MEmristors.
        DIDACTIC: A Data Intelligent Digital-to-Analog Converter with a Trainable Integrated Circuit using Memristors.
        Ferroelectric FET-Based Time-Domain In-Memory Computing Macro with Tunable Delay Calibration in 28 nm CMOS.
        FeFET-based Reconfigurable Voltage-to-Time Converter in 28 nm CMOS.
        Transient Kickback Effect of Multi-Reference Pair Comparators on High-Speed ADC and Receivers.
        A FeFET CAM-Based Time-Domain In-Memory Computing Macro with 550 ps Delay Step in 28 nm CMOS.
        FeFET-Based Time-Domain In-Memory Computing Macro with Tunable Delay Calibration.
        A Delay-Locked Loop with Binary Search Locking and Dead Clocks Detection.
        Novel Clock Architecture for Ultra-Low Power DDR PHY.
        Towards 500GHz Non-Volatile Monolayer 6G Switches.
        Sub-Nanosecond Partial Reset for Analog Phase Change Neuromorphic Devices.
        Electrothermal Compact Modeling of Indirectly Heated Phase Change RF Switches.
        Nanosecond Probing of Phase Transition Properties in Chalcogenides using Embedded Heater-Thermometer.
        A Dual-Band CMOS Low-Noise Amplifier using Memristor-Based Tunable Inductors.
        An RF Memristor Model and Memristive Single-Pole Double-Throw Switches.
        RF Memristor Modeling.
        GOES-East satellite images processing in Uruguay and future perspectives.
        Wireless image-sensor network application for population monitoring of lepidopterous insect pest in fruit crops.
        A Wireless Sensor Network Application with Distributed Processing in the Compressed Domain.
        Towards Energy-Efficient AI Hardware: Mixed-Signal In-Memory Computing and Ultra-Dense Die-to-Die Links.
        The Chiplet Revolution and its Challenges on Die-to-Die Interfaces.
        Memristor-based Reconfigurable Radiofrequency Circuits.
        Analog and Mixed-Signal Circuit Design with Memristors.
        Reconfigurable RF Circuits using Memristors.
        Memristors for RF and Mixed-Signal Circuits.
      `,
      kind: 'page'
    },
    {
      pageHref: 'publications.html',
      pageTitle: 'Publications',
      title: 'Journals',
      text: 'Journal papers on time-domain in-memory computing, DLLs, radiofrequency switching, memristors, phase change memory, neuromorphic computing, ADCs, tunable inductors, and data converters.',
      anchor: 'journals',
      kind: 'section'
    },
    {
      pageHref: 'publications.html',
      pageTitle: 'Publications',
      title: 'Conferences',
      text: 'Conference papers on FeFET, time-domain in-memory computing, voltage-to-time converters, kickback in ADCs and receivers, DDR PHY, 6G switches, RF switch compact modeling, and memristor circuits.',
      anchor: 'conferences',
      kind: 'section'
    },
    {
      pageHref: 'publications.html',
      pageTitle: 'Publications',
      title: 'Talks',
      text: 'Talks on energy-efficient AI hardware, mixed-signal in-memory computing, die-to-die links, chiplets, phase transition properties in chalcogenides, memristor-based reconfigurable radiofrequency circuits, and analog and mixed-signal circuit design with memristors.',
      anchor: 'talks',
      kind: 'section'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'People',
      text: `
        Meet the AMSG Team. Principal investigator, research staff, current students, former students.
        Nicolas Wainstein, Ilana Zilberger, Michael Sotman, Doron Orenstein, Jeries Mattar, Dima Saleh,
        Sharon Ponarovsky, Yousef Safadi, Ofir Glick, Yinon Geva, Daniel Komenetsky, Mahmoud Mahajna.
      `,
      kind: 'page'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Dr. Nicolas Wainstein',
      text: 'Assistant Professor, head of AMSG. Analog and mixed-signal integrated circuits, time-domain computing, AI hardware, die-to-die links, data converters, emerging memory technologies.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Ilana Zilberger',
      text: 'Research Administrative Manager. Operational support, coordination, administrative management, research activities, group logistics.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Michael Sotman',
      text: 'Lab Engineer. Maintains lab infrastructure, supports experiments, hardware setup, testing, measurement.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Doron Orenstein',
      text: 'Researcher. Research projects, prototypes, technical development, mixed-signal and AI hardware domains.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Jeries Mattar',
      text: 'PhD Student. AI hardware and time-domain in-memory computing.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Dima Saleh',
      text: 'Graduate Student. AI hardware and time-domain in-memory computing.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Sharon Ponarovsky',
      text: 'Graduate Student. Neuromorphic computing.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Yousef Safadi',
      text: 'Graduate Student. Ultra-dense and energy-efficient die-to-die links.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Ofir Glick',
      text: 'Graduate Student. High-speed, low-power ADCs.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Yinon Geva',
      text: 'Graduate Student. Ultra-dense and energy-efficient die-to-die links.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Daniel Komenetsky',
      text: 'Graduate Student. High-speed, low-power ADCs.',
      kind: 'detail'
    },
    {
      pageHref: 'people.html',
      pageTitle: 'People',
      title: 'Mahmoud Mahajna',
      text: 'Graduate Student. Embedded systems, neuromorphic hardware, and integrated circuits.',
      kind: 'detail'
    },
    {
      pageHref: 'news.html',
      pageTitle: 'News',
      title: 'News',
      text: `
        Latest updates from AMSG. Announcements, publications, awards, accepted papers,
        conference papers, event retrospectives, group events, ACRC retreat, research events.
      `,
      kind: 'page'
    },
    {
      pageHref: 'accessibility-information.html',
      pageTitle: 'Accessibility',
      title: 'מידע על נגישות',
      text: `
        הצהרת נגישות. הטכניון רואה חשיבות רבה בהנגשת אתרי האינטרנט שלו כדי לאפשר לאנשים עם מוגבלויות לגלוש באופן מיטבי.
        רמת הנגישות. עמידה ברמת AA לפי WCAG 2.0, תמיכה בקורא מסך, ניווט במקלדת בלבד, התאמת קונטרסט,
        תיאורים חלופיים לתכנים גרפיים, הגדלת תכנים באמצעות הדפדפן, התאמה לדפדפנים נפוצים, הימנעות מהבהובים ותנועה מהירה.
        סיוע במקרה של בעיית נגישות. ilanapirvu@ef.technion.ac.il 077-8873231
      `,
      kind: 'page'
    },
    {
      pageHref: 'accessibility-information.html',
      pageTitle: 'Accessibility',
      title: 'הצהרת נגישות',
      text: 'הטכניון מייחס חשיבות רבה להנגשת אתרי האינטרנט שלו עבור אנשים עם מוגבלויות ומקדם תהליך מתמשך של הנגשה עבור אתרים מונגשים.',
      kind: 'detail'
    },
    {
      pageHref: 'accessibility-information.html',
      pageTitle: 'Accessibility',
      title: 'רמת הנגישות',
      text: 'מחויבות לרמת AA לפי WCAG 2.0. תמיכה בקורא מסך, ניווט במקלדת, קונטרסט מתאים, תיאורים חלופיים, הגדלה בדפדפן, תאימות לדפדפנים נפוצים, הימנעות מהבהובים.',
      kind: 'detail'
    },
    {
      pageHref: 'accessibility-information.html',
      pageTitle: 'Accessibility',
      title: 'סיוע במקרה של בעיה',
      text: 'במקרה של בעיית נגישות ניתן לפנות בדוא״ל ל-ilanapirvu@ef.technion.ac.il או בטלפון 077-8873231.',
      kind: 'detail'
    },
    {
      pageHref: 'contact.html',
      pageTitle: 'Contact',
      title: 'Contact',
      text: `
        Get in touch. Analog/Mixed-Signal Research Group. Technion Israel Institute of Technology.
        Andrew and Erna Viterbi Faculty of Electrical and Computer Engineering.
        Prospective students, collaboration and recruiting, circuits, AI hardware, high-speed interconnects.
      `,
      kind: 'page'
    },
    {
      pageHref: 'contact.html',
      pageTitle: 'Contact',
      title: 'Prospective students',
      text: 'Prospective students can contact the group with a short introduction, CV, transcript, and research interests in circuits, AI hardware, or related areas.',
      kind: 'detail'
    },
    {
      pageHref: 'contact.html',
      pageTitle: 'Contact',
      title: 'Collaboration and recruiting',
      text: 'Collaborations across academia and industry in analog and mixed-signal ICs, AI hardware, and high-speed interconnects.',
      kind: 'detail'
    }
  ];

  return rawChunks.map((chunk) => createSearchChunk(chunk)).filter(Boolean);
};

const getSearchAnchorForElement = (element) => {
  if (!element) return '';
  if (element.id) return element.id;

  const anchoredParent = element.closest('section[id], article[id], div[id]');
  return anchoredParent?.id || '';
};

const extractSearchChunksFromDocument = (doc, pageMeta) => {
  const main = doc.querySelector('main');
  if (!main) return [];

  const chunks = [];
  const pageTitle = normalizeWhitespace(pageMeta.title || doc.title || 'AMSG');
  const introText = collectSearchText(main);
  const pageChunk = createSearchChunk({
    pageHref: pageMeta.href,
    pageTitle,
    title: pageTitle,
    text: introText,
    keywords: pageMeta.keywords,
    kind: 'page'
  });

  if (pageChunk) chunks.push(pageChunk);

  const headingContainers = new Set();
  main.querySelectorAll('h1, h2, h3').forEach((heading) => {
    const detailContainer = heading.closest('article, .card, .timeline-item');
    const container = detailContainer || heading.closest('section') || heading.parentElement;
    if (container) headingContainers.add(container);
  });

  headingContainers.forEach((container) => {
    const heading = container.querySelector('h1, h2, h3');
    const text = collectSearchText(container);
    if (!heading || !text) return;

    const kind = container.matches('article, .card, .timeline-item') ? 'detail' : 'section';
    const chunk = createSearchChunk({
      pageHref: pageMeta.href,
      pageTitle,
      title: heading.textContent || pageTitle,
      text,
      keywords: pageMeta.keywords,
      anchor: getSearchAnchorForElement(container),
      kind
    });

    if (chunk) chunks.push(chunk);
  });

  return chunks;
};

const createDynamicSearchChunks = () => {
  const newsPageMeta = SITE_SEARCH_PAGES.find((page) => page.href === 'news.html');
  if (!newsPageMeta) return [];

  return NEWS_ITEMS.map((item) => createSearchChunk({
    pageHref: 'news.html',
    pageTitle: newsPageMeta.title,
    title: item.title,
    text: [item.eyebrow, item.summary, ...(item.details || [])].join(' '),
    keywords: [...newsPageMeta.keywords, item.eyebrow],
    kind: 'detail'
  })).filter(Boolean);
};

let siteSearchIndexPromise = null;

const buildSiteSearchIndex = async () => {
  const currentPageMeta = SITE_SEARCH_PAGES.find((pageMeta) => pageMeta.href === CURRENT_PAGE_KEY);
  const currentPageChunks = currentPageMeta
    ? extractSearchChunksFromDocument(document, currentPageMeta)
    : [];

  const dedupedChunks = new Map();
  [...createStaticSearchChunks(), ...currentPageChunks, ...createDynamicSearchChunks()].forEach((chunk) => {
    const key = [
      chunk.pageHref,
      chunk.anchor,
      chunk.title,
      chunk.text.slice(0, 180)
    ].join('::');
    if (!dedupedChunks.has(key)) dedupedChunks.set(key, chunk);
  });

  return [...dedupedChunks.values()];
};

const getSiteSearchIndex = () => {
  if (!siteSearchIndexPromise) {
    siteSearchIndexPromise = buildSiteSearchIndex();
  }
  return siteSearchIndexPromise;
};

const scoreSearchChunk = (chunk, query) => {
  if (!query) return -1;

  const normalizedQuery = normalizeSearchValue(query);
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const title = normalizeSearchValue(chunk.title);
  const pageTitle = normalizeSearchValue(chunk.pageTitle);
  const text = normalizeSearchValue(chunk.text);
  const keywords = normalizeSearchValue(chunk.keywords.join(' '));

  let score = 0;
  let matched = false;

  if (title === normalizedQuery) {
    score += 220;
    matched = true;
  } else if (title.includes(normalizedQuery)) {
    score += 150;
    matched = true;
  }

  if (pageTitle === normalizedQuery) {
    score += 120;
    matched = true;
  } else if (pageTitle.includes(normalizedQuery)) {
    score += 70;
    matched = true;
  }

  if (keywords.includes(normalizedQuery)) {
    score += 60;
    matched = true;
  }

  if (text.includes(normalizedQuery)) {
    score += 100 - Math.min(normalizedQuery.length, 40);
    matched = true;
  }

  terms.forEach((term) => {
    if (title.includes(term)) score += 24;
    if (pageTitle.includes(term)) score += 12;
    if (keywords.includes(term)) score += 10;
    if (text.includes(term)) score += 7;
  });

  if (!matched && !terms.some((term) => title.includes(term) || text.includes(term) || keywords.includes(term))) {
    return -1;
  }

  if (chunk.pageHref === CURRENT_PAGE_KEY) score += 35;
  if (chunk.kind === 'detail') score += 18;
  if (chunk.kind === 'section') score += 8;
  if (chunk.kind === 'page') score -= 10;

  const breadthPenalty = Math.min(Math.floor(chunk.text.length / 800), 10);
  return score - breadthPenalty;
};

const findSiteSearchResults = (chunks, query) => {
  const seen = new Set();

  return chunks
    .map((chunk) => ({
      ...chunk,
      score: scoreSearchChunk(chunk, query),
      snippet: getSearchSnippet(chunk.text, query)
    }))
    .filter((chunk) => chunk.score >= 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (left.pageHref === CURRENT_PAGE_KEY && right.pageHref !== CURRENT_PAGE_KEY) return -1;
      if (right.pageHref === CURRENT_PAGE_KEY && left.pageHref !== CURRENT_PAGE_KEY) return 1;
      return left.title.localeCompare(right.title);
    })
    .filter((chunk) => {
      const key = `${chunk.pageHref}::${chunk.anchor}::${chunk.title}::${chunk.snippet}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const buildSearchResultUrl = (result, rawQuery) => {
  const targetUrl = new URL(result.pageHref, window.location.href);
  targetUrl.searchParams.set('q', rawQuery.trim());
  if (result.anchor) targetUrl.hash = result.anchor;
  return targetUrl;
};

const initSiteSearch = () => {
  const forms = document.querySelectorAll('[data-site-search-form]');
  const searchToggles = document.querySelectorAll('[data-search-toggle]');
  if (!forms.length) return;

  const params = new URLSearchParams(window.location.search);
  const currentQuery = params.get('q') || '';

  const ensureResultsPanel = (form) => {
    let panel = form.querySelector('.site-search-results');
    if (panel) return panel;

    panel = document.createElement('div');
    panel.className = 'site-search-results';
    panel.hidden = true;
    panel.setAttribute('role', 'listbox');
    panel.setAttribute('aria-label', 'Site search results');
    form.appendChild(panel);
    return panel;
  };

  const hideFormResults = (form) => {
    const panel = form.querySelector('.site-search-results');
    if (!panel) return;
    panel.hidden = true;
    panel.innerHTML = '';
  };

  const setFormResultsState = (form, html) => {
    const panel = ensureResultsPanel(form);
    panel.innerHTML = html;
    panel.hidden = false;
  };

  const syncSearchInputs = (value, sourceInput) => {
    forms.forEach((form) => {
      const input = form.querySelector('.site-search-input');
      if (!input || input === sourceInput) return;
      input.value = value;
    });
  };

  const closeSearches = () => {
    document.querySelectorAll('.site-search--desktop, .site-search--mobile').forEach((form) => {
      form.hidden = true;
      hideFormResults(form);
    });
    searchToggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  };

  searchToggles.forEach((toggle) => {
    const toolsRoot = toggle.closest('.header-tools');
    const desktopForm = toolsRoot?.querySelector('.site-search--desktop');
    const mobileForm = toolsRoot?.querySelector('.site-search--mobile');
    if (!desktopForm && !mobileForm) return;

    toggle.addEventListener('click', (event) => {
      const activeForm = window.matchMedia('(max-width: 760px)').matches ? mobileForm : desktopForm;
      const activeInput = activeForm?.querySelector('.site-search-input');
      const willOpen = activeForm?.hidden;

      closeSearches();
      if (!activeForm) return;

      activeForm.hidden = !willOpen;
      toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      if (willOpen && activeInput) activeInput.focus();
      event.stopPropagation();
    });

    [desktopForm, mobileForm].forEach((form) => {
      form?.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
  });

  forms.forEach((form) => {
    const input = form.querySelector('.site-search-input');
    if (!input) return;

    input.value = currentQuery;
    let searchRunId = 0;

    const runSearch = async () => {
      const runId = ++searchRunId;
      const rawQuery = input.value;
      const query = normalizeSearchValue(rawQuery);
      syncSearchInputs(rawQuery, input);

      if (!query) {
        hideFormResults(form);
        return [];
      }

      setFormResultsState(form, '<div class="site-search-results-empty">Searching...</div>');
      const results = findSiteSearchResults(await getSiteSearchIndex(), rawQuery);
      if (runId !== searchRunId) return [];

      if (!results.length) {
        setFormResultsState(form, '<div class="site-search-results-empty">No matches found.</div>');
        return [];
      }

      const resultItems = results.map((result) => {
        const resultUrl = buildSearchResultUrl(result, rawQuery);
        const pageLabel = result.pageHref === CURRENT_PAGE_KEY
          ? `${result.pageTitle} · Current page`
          : result.pageTitle;

        return `
          <a class="site-search-result" href="${escapeHtml(resultUrl.toString())}" data-search-result-link>
            <div class="site-search-result-page">${escapeHtml(pageLabel)}</div>
            <div class="site-search-result-title">${escapeHtml(result.title)}</div>
            <div class="site-search-result-snippet">${escapeHtml(result.snippet)}</div>
          </a>
        `;
      }).join('');

      setFormResultsState(
        form,
        `<div class="site-search-results-meta">${results.length} result${results.length === 1 ? '' : 's'}</div>${resultItems}`
      );

      form.querySelectorAll('[data-search-result-link]').forEach((link, index) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const result = results[index];
          const targetUrl = buildSearchResultUrl(result, rawQuery);

          if (result.pageHref === CURRENT_PAGE_KEY) {
            history.replaceState(null, '', targetUrl);
            if (result.anchor) {
              document.getElementById(result.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            highlightSearchQuery(rawQuery.trim());
            closeSearches();
            return;
          }

          window.location.href = targetUrl.toString();
        });
      });

      return results;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const results = await runSearch();
      if (!results.length) return;

      const targetUrl = buildSearchResultUrl(results[0], input.value);
      if (results[0].pageHref === CURRENT_PAGE_KEY) {
        history.replaceState(null, '', targetUrl);
        if (results[0].anchor) {
          document.getElementById(results[0].anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        highlightSearchQuery(input.value.trim());
        closeSearches();
        return;
      }

      window.location.href = targetUrl.toString();
    });

    input.addEventListener('input', () => {
      runSearch();
    });

    input.addEventListener('focus', () => {
      if (normalizeSearchValue(input.value)) {
        runSearch();
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeSearches();
      }
    });
  });

  window.addEventListener('click', () => {
    closeSearches();
  });

  if (currentQuery) {
    highlightSearchQuery(currentQuery);
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => {
      getSiteSearchIndex();
    });
  } else {
    window.setTimeout(() => {
      getSiteSearchIndex();
    }, 300);
  }
};

initSiteSearch();

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const NEWS_ITEMS = [
  {
    id: 'newcas-2026-acceptance',
    eyebrow: 'Accepted Paper',
    title: 'Paper accepted to IEEE NEWCAS 2026',
    summary: 'Great news! Hanaa and Jeries\' paper has been accepted to IEEE NEWCAS 2026. The paper presents a tunable FeFET-based voltage-to-time conveter (VTC) in 28 nm CMOS.',
    details: [
      'Great news! Hanaa and Jeries\' paper has been accepted to IEEE NEWCAS 2026. The paper presents a tunable FeFET-based voltage-to-time conveter (VTC) in 28 nm CMOS.'
    ],
    ctaLabel: 'Read the preprint',
    ctaHref: 'https://lnkd.in/dwKsBqAd',
    images: []
  },
  {
    id: 'first-team-event',
    eyebrow: 'Group Event',
    title: 'First AMSG Team Event',
    summary: 'On February 11, we held the first team event of AMSG!',
    details: [
      'On February 11, 2026 we held the first AMSG team event, bringing members together for celebration, discussion, and plans for future collaboration.'
    ],
    images: [
      'assets/img/events/group_event_2026/groupevent_0.jpeg',
      'assets/img/events/group_event_2026/groupevent_1.jpeg',
      'assets/img/events/group_event_2026/groupevent_2.jpeg',
      'assets/img/events/group_event_2026/groupevent_3.jpeg',
      'assets/img/events/group_event_2026/groupevent_4.jpeg',
      'assets/img/events/group_event_2026/groupevent_5.jpeg',
      'assets/img/events/group_event_2026/groupevent_6.jpeg',
      'assets/img/events/group_event_2026/groupevent_7.jpeg',
      'assets/img/events/group_event_2026/groupevent_8.jpeg'
    ]
  },
  {
    id: 'acrc-retreat',
    eyebrow: 'Event Retrospective',
    title: 'AMSG Participated in the ACRC Retreat',
    summary: 'AMSG participated in the ACRC retreat at Kfar Blum, a wonderful opportunity to showcase our research, hear about other research in academia and industry in Israel.',
    details: [
      'AMSG participated in the ACRC retreat at Kfar Blum, a wonderful opportunity to showcase our research, hear about other reseach in academia and industry in Israel.',
      'Dima, Ofir, and Nico presented talks, while Sharon, Jeries, Dima, Yousef, and Ofir presented posters.'
    ],
    images: [
      'assets/img/events/acrc_retreat/ACRC_retreat_2026.jpg',
      'assets/img/events/acrc_retreat/Dima_ACRC_2026.jpeg',
      'assets/img/events/acrc_retreat/Nico_ACRC_2026.jpg',
      'assets/img/events/acrc_retreat/Ofir_ACRC_2026.jpg',
      'assets/img/events/acrc_retreat/Sharon_ACRC_2026.jpg'
    ]
  },
  {
    id: 'tcas-acceptance',
    eyebrow: 'Accepted Paper',
    title: 'Jeries’ paper accepted to IEEE TCAS I',
    summary: 'Jeries’ paper was accepted to IEEE Transactions on Circuits and Systems I: Regular Papers.',
    details: [
      'Great news! Jeries’ paper got accepted to IEEE Transactions on Circuits and Systems I: Regular Papers.',
      'In this work, we present a reconfigurable time-domain in-memory computing (TD-IMC) macro that combines FeFET-based CAM with multilevel delay calibration in 28 nm CMOS, pushing toward compact and energy-efficient AI hardware.',
      'Great collaboration with GlobalFoundries team (Halid Mulaosmanovic, Sven Beyer, Gunda Beernink, Stefan Dünkel) and Yalon’s group at the Technion (Eilam Yalon and Mor Dahan).'
    ],
    ctaLabel: 'Read the preprint',
    ctaHref: 'https://lnkd.in/dwKsBqAd',
    images: []
  },
  {
    id: 'icsee-acceptances',
    eyebrow: 'Conference Papers',
    title: 'AMSG Got 3 Papers Accepted to ICSEE 2026',
    summary: 'Our group got three papers accepted to ICSEE 2026, with congratulations to Ofir, Jeries, and Hanaa.',
    details: [
      'Great news! Our group got three papers accepted to ICSEE 2026.',
      'Congrats to Ofir, Jeries, and Hanaa! Well done!'
    ],
    images: []
  },

  {
    id: 'events-spotlight',
    eyebrow: 'Event Spotlight',
    title: 'AMSG Students Participated in Worlds of Hardware and ACRC Research Event',
    summary: 'AMSG students presented their work this month at the Worlds of Hardware and ACRC Research Event at the Technion.',
    details: [
      'This month, AMSG students presented their work in the Worlds of Hardware and ACRC Research Event at the Technion.',
      'Congrats to all! Keep up the excellent work!'
    ],
    images: [
      'https://ams.net.technion.ac.il/files/2025/11/20251105_132333-768x1024.jpg',
      'https://ams.net.technion.ac.il/files/2025/11/20251105_132418-768x1024.jpg',
      'https://ams.net.technion.ac.il/files/2025/11/20251105_132633-768x1024.jpg',
      'https://ams.net.technion.ac.il/files/2025/11/20251105_132448-768x1024.jpg',
      'https://ams.net.technion.ac.il/files/2025/11/20251105_134415-768x1024.jpg',
      'https://ams.net.technion.ac.il/files/2025/11/WhatsApp-Image-2025-11-24-at-19.56.07-768x1021.jpeg'
    ]
  },
  {
    id: 'nvmts-award',
    eyebrow: 'Award',
    title: 'Jeries wins Best Poster Award at NVMTS 2025',
    summary: 'Jeries won the Best Poster Award at NVMTS 2025 for our work on time-domain compute-in-memory with FeFETs.',
    details: [
      'Great news! Jeries won the Best Poster Award at IEEE Non-Volatile Memory Technology Symposium (NVMTS) 2025 for our work: “Reconfigurable Time-Domain In-Memory Computing Macro using CAM FeFET in 28nm CMOS.”',
      'This recognition highlights the exciting potential of time-domain in-memory computing using ferroelectric FETs.',
      'Well done, Jeries — looking forward to what comes next!'
    ],
    images: []
  },
  {
    id: 'imo-2025',
    eyebrow: 'Achievement',
    title: 'Ofir Glick Represents Israel in the 2025 International Microelectronics Olympiad in Armenia',
    summary: 'Ofir represented Israel and the Technion at the 2025 International Microelectronics Olympiad in Armenia.',
    details: [
      'Congratulations to Ofir for representing Israel and the Technion with excellence at the 2025 International Microelectronics Olympiad in Armenia!',
      'Out of more than 1,000 electrical engineering students from around the globe, only 34 exceptional finalists earned their place in the competition.',
      'Well done Ofir!'
    ],
    images: []
  }
];

const NEWS_ITEMS_MAP = Object.fromEntries(NEWS_ITEMS.map((item) => [item.id, item]));
const INDEX_NEWS_PREVIEW_IDS = [
  'newcas-2026-acceptance',
  'acrc-retreat',
  'tcas-acceptance'
];
const INDEX_NEWS_PREVIEW_ITEMS = INDEX_NEWS_PREVIEW_IDS
  .map((id) => NEWS_ITEMS_MAP[id])
  .filter(Boolean);

const renderNewsCards = (container, items, options = {}) => {
  if (!container) return;

  const cardsHtml = items.map((item) => {
    const bodyHtml = options.preview
      ? `<p>${item.summary}</p>`
      : item.details.map((detail) => `<p>${detail}</p>`).join('');
    const ctaHtml = !options.preview && item.ctaLabel && item.ctaHref
      ? `<p><a class="btn btn-primary" href="${item.ctaHref}" target="_blank" rel="noopener" data-news-link>${item.ctaLabel}</a></p>`
      : '';
    const cardAttributes = options.preview ? '' : ` data-news-id="${item.id}"`;

    return `
      <article class="card reveal is-visible"${cardAttributes}>
        <div class="eyebrow">${item.eyebrow}</div>
        <h2>${item.title}</h2>
        ${bodyHtml}
        ${ctaHtml}
      </article>
    `;
  }).join('');

  container.innerHTML = cardsHtml;

  container.querySelectorAll('[data-news-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });
};

renderNewsCards(document.getElementById('news-page-list'), NEWS_ITEMS);
renderNewsCards(document.getElementById('index-news-preview'), INDEX_NEWS_PREVIEW_ITEMS, { preview: true });

const teamCarousel = document.querySelector('[data-team-carousel]');
if (teamCarousel) {
  const teamMembers = [
    {
      name: 'Dr. Nicolás (Nico) Wainstein',
      role: 'Assistant Professor · Head of AMSG',
      image: 'https://ams.net.technion.ac.il/files/2022/11/nico_photo_web.jpeg'
    },
    {
      name: 'Jeries Mattar',
      role: 'PhD Student',
      image: 'https://ams.net.technion.ac.il/files/2023/06/jeries_photo-1701x2048.jpg'
    },
    {
      name: 'Ilana Zilberger',
      role: 'Research Administrative Manager',
      image: 'https://ams.net.technion.ac.il/files/2025/12/team-pic-ilana.jpg'
    },
    {
      name: 'Michael Sotman',
      role: 'Lab Engineer',
      image: 'https://ams.net.technion.ac.il/files/2026/03/Misha.jpg'
    },
    {
      name: 'Doron Orenstein',
      role: 'Researcher',
      image: 'https://ams.net.technion.ac.il/files/2026/03/Doron.jpg'
    },
    {
      name: 'Dima Saleh',
      role: 'Graduate Student',
      image: 'https://ams.net.technion.ac.il/files/2024/09/dima-768x768.jpg'
    },
    {
      name: 'Sharon Ponarovsky',
      role: 'Graduate Student',
      image: 'https://ams.net.technion.ac.il/files/2025/06/Photo673-2048x2048.jpg'
    },
    {
      name: 'Yousef Safadi',
      role: 'Graduate Student',
      image: 'https://ams.net.technion.ac.il/files/2025/03/yousef.jpg'
    },
    {
      name: 'Ofir Glick',
      role: 'Graduate Student',
      image: 'https://ams.net.technion.ac.il/files/2025/03/%D7%AA%D7%9E%D7%95%D7%A0%D7%AA-%D7%A4%D7%A0%D7%99%D7%9D-581x1024.png'
    },
    {
      name: 'Yinon Geva',
      role: 'Graduate Student',
      image: 'https://ams.net.technion.ac.il/files/2026/01/yinon.jpg'
    },
    {
      name: 'Daniel Komenetsky',
      role: 'Graduate Student',
      image: 'https://ams.net.technion.ac.il/files/2026/03/Daniel-768x615.jpeg'
    }
  ];
  const teamImages = Array.from(teamCarousel.querySelectorAll('[data-team-image]'));
  const teamNames = Array.from(teamCarousel.querySelectorAll('[data-team-name]'));
  const teamDots = Array.from(document.querySelectorAll('[data-team-dot]'));
  const teamPrev = teamCarousel.querySelector('[data-team-prev]');
  const teamNext = teamCarousel.querySelector('[data-team-next]');
  let activeTeamIndex = 0;
  let teamTimer = null;
  const teamStep = 2;

  const setActiveTeamMember = (index) => {
    activeTeamIndex = (index + teamMembers.length) % teamMembers.length;

    teamImages.forEach((teamImage, imageIndex) => {
      const member = teamMembers[(activeTeamIndex + imageIndex) % teamMembers.length];
      teamImage.src = member.image;
      teamImage.alt = member.name;
    });

    teamNames.forEach((teamName, nameIndex) => {
      const member = teamMembers[(activeTeamIndex + nameIndex) % teamMembers.length];
      teamName.textContent = member.name;
    });

    teamDots.forEach((dot) => {
      const isActive = Number(dot.dataset.teamIndex) === activeTeamIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  };

  const restartTeamCarousel = () => {
    if (teamTimer) window.clearInterval(teamTimer);
    teamTimer = window.setInterval(() => {
      setActiveTeamMember(activeTeamIndex + teamStep);
    }, 4500);
  };

  teamPrev?.addEventListener('click', () => {
    setActiveTeamMember(activeTeamIndex - teamStep);
    restartTeamCarousel();
  });

  teamNext?.addEventListener('click', () => {
    setActiveTeamMember(activeTeamIndex + teamStep);
    restartTeamCarousel();
  });

  teamDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      setActiveTeamMember(Number(dot.dataset.teamIndex));
      restartTeamCarousel();
    });
  });

  setActiveTeamMember(activeTeamIndex);
  restartTeamCarousel();
}

document.querySelectorAll('[data-slideshow]').forEach((slideshow) => {
  const slides = Array.from(slideshow.querySelectorAll('[data-slide]'));
  const dots = Array.from(slideshow.querySelectorAll('[data-slide-dot]'));
  const prevButton = slideshow.querySelector('[data-slide-prev]');
  const nextButton = slideshow.querySelector('[data-slide-next]');
  const captionDisplay = slideshow.parentElement?.querySelector('[data-slide-caption-display]');
  let activeSlideIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  let slideshowTimer = null;

  if (activeSlideIndex < 0) activeSlideIndex = 0;

  const setActiveSlide = (index) => {
    if (!slides.length) return;
    activeSlideIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeSlideIndex);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlideIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (captionDisplay) {
      captionDisplay.textContent = slides[activeSlideIndex]?.dataset.slideCaption || '';
    }
  };

  const restartSlideshow = () => {
    if (slideshowTimer) window.clearInterval(slideshowTimer);
    if (slides.length < 2) return;
    slideshowTimer = window.setInterval(() => {
      setActiveSlide(activeSlideIndex + 1);
    }, 5000);
  };

  prevButton?.addEventListener('click', () => {
    setActiveSlide(activeSlideIndex - 1);
    restartSlideshow();
  });

  nextButton?.addEventListener('click', () => {
    setActiveSlide(activeSlideIndex + 1);
    restartSlideshow();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setActiveSlide(index);
      restartSlideshow();
    });
  });

  setActiveSlide(activeSlideIndex);
  restartSlideshow();
});

/* Accessibility toggles */
const A11Y_KEYS = {
  font: 'a11y-large-font',
  contrast: 'a11y-high-contrast'
};

const setA11yMode = (type, enabled) => {
  const className = A11Y_KEYS[type];
  if (!className) return;
  document.body.classList.toggle(className, enabled);
  localStorage.setItem(`amsg-${type}`, enabled ? '1' : '0');

  if (type === 'contrast') {
    updateTechnionLogo();
  }
};

const initA11yToggles = () => {
  const fontStored = localStorage.getItem('amsg-font');
  const contrastStored = localStorage.getItem('amsg-contrast');
  setA11yMode('font', fontStored === '1');
  setA11yMode('contrast', contrastStored === '1');
};

initA11yToggles();

const initA11yPanel = () => {
  const settingsRoot = document.querySelector('.a11y-settings');
  const settingsToggle = document.getElementById('a11y-settings-toggle');
  const settingsPanel = document.getElementById('a11y-settings-panel');
  const settingsHide = document.getElementById('a11y-settings-hide');
  const themeToggle = document.getElementById('a11y-theme-toggle');

  if (!settingsRoot || !settingsToggle || !settingsPanel || !themeToggle) return;

  let autoCollapseTimer = null;
  const AUTO_COLLAPSE_MS = 8000;

  const clearAutoCollapse = () => {
    if (autoCollapseTimer) {
      window.clearTimeout(autoCollapseTimer);
      autoCollapseTimer = null;
    }
  };

  const startAutoCollapse = () => {
    clearAutoCollapse();
    autoCollapseTimer = window.setTimeout(() => {
      closePanel();
    }, AUTO_COLLAPSE_MS);
  };

  const openPanel = () => {
    settingsPanel.hidden = false;
    settingsPanel.classList.add('open');
    settingsRoot.classList.remove('a11y-settings--collapsed');
    settingsToggle.setAttribute('aria-expanded', 'true');
    startAutoCollapse();
  };

  const closePanel = () => {
    settingsPanel.hidden = true;
    settingsPanel.classList.remove('open');
    settingsRoot.classList.add('a11y-settings--collapsed');
    settingsToggle.setAttribute('aria-expanded', 'false');
    clearAutoCollapse();
  };

  const updateThemeButton = () => {
    const isHighContrast = document.body.classList.contains('a11y-high-contrast');
    themeToggle.setAttribute('aria-pressed', isHighContrast ? 'true' : 'false');
    themeToggle.textContent = isHighContrast ? 'Light mode' : 'Dark mode';
  };

  settingsToggle.addEventListener('click', (event) => {
    const expanded = settingsToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closePanel();
    else openPanel();
    event.stopPropagation();
  });

  if (settingsHide) {
    settingsHide.addEventListener('click', (event) => {
      closePanel();
      event.stopPropagation();
    });
  }

  window.addEventListener('click', (event) => {
    if (!settingsPanel.contains(event.target) && event.target !== settingsToggle) {
      closePanel();
    }
  });

  settingsPanel.addEventListener('mouseenter', clearAutoCollapse);
  settingsPanel.addEventListener('mouseleave', startAutoCollapse);

  settingsPanel.querySelectorAll('[data-a11y-font]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-a11y-font');
      if (mode === 'increase') setA11yMode('font', true);
      else if (mode === 'decrease') setA11yMode('font', false);
      else if (mode === 'reset') {
        document.body.classList.remove('a11y-large-font');
        localStorage.setItem('amsg-font', '0');
      }
      startAutoCollapse();
    });
  });

  themeToggle.addEventListener('click', () => {
    const active = document.body.classList.toggle('a11y-high-contrast');
    localStorage.setItem('amsg-contrast', active ? '1' : '0');
    updateThemeButton();
    updateTechnionLogo();
    startAutoCollapse();
  });

  updateThemeButton();
  updateTechnionLogo();
};

initA11yPanel();

/* Modal (person detail) */
const personModal = document.getElementById('person-modal');
if (personModal) {
  const modalName = personModal.querySelector('.modal-name');
  const modalRole = personModal.querySelector('.modal-role');
  const modalBio = personModal.querySelector('.modal-bio');
  const modalContactList = personModal.querySelector('.modal-contact-list');
  const modalAvatar = personModal.querySelector('.modal-avatar img');
  const modalScholarLink = personModal.querySelector('[data-link="scholar"]');
  const modalLinkedInLink = personModal.querySelector('[data-link="linkedin"]');

  const peopleModalData = {
    nico: {
      name: 'Dr. Nicolás (Nico) Wainstein',
      role: 'Assistant Professor · Head of AMSG',
      img: 'https://ams.net.technion.ac.il/files/2022/11/nico_photo_web.jpeg',
      bio: 'Nicolás Wainstein is an Assistant Professor at the Andrew and Erna Viterbi Faculty of Electrical Engineering and the Robert J. Shillman Career Advancement Chair, Technion – Israel Institute of Technology. He received his B.Sc. in Electrical Engineering from Universidad de la República, Uruguay, in 2014, and his Ph.D. in Electrical Engineering from the Technion – Israel Institute of Technology in 2021. From 2021 to 2024, he was an Analog/Mixed-Signal Design Technical Lead Engineer at Intel, Israel, working on high-speed parallel wireline links, such as DDR and die-to-die (D2D) communication. His current research focuses on analog/mixed-signal integrated circuit design, with an emphasis on high-speed I/O, data converters, and hardware for machine learning. Previously, he worked on the development, fabrication, and modeling of high-performance PCM RF switches, as well as the circuit design and fabrication of reconfigurable RF front-end circuits based on these devices. Nicolás was the recipient of several prestigious awards, including the 2021 Hershel Rich Innovation Award, the 2020 IEEE Electron Devices Society Ph.D. Student Fellowship, the 2020 Yablonovitch Research Prize, and the 2020 RBNI Prize for Excellence in Nanoscience and Nanotechnology. He also received the RBNI Scholarship in 2020, the 2019 Jury Award for Outstanding Students, and the Excellence Scholarship from the Andrew and Erna Viterbi Faculty of Electrical Engineering, Technion, in 2018, 2019, and 2020.',
      contact: {
        Email: 'nico@technion.ac.il',
        Office: '419 Zisapel Building, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion - Israel Institute of Technology',
        Phone: '+972 73-3787173'
      },
      links: {
        scholar: 'https://scholar.google.com/citations?user=eRLRrpMAAAAJ&hl=en',
        linkedin: 'https://www.linkedin.com/in/nicolas-wainstein-kornecki/?locale=en'
      },
      details: [
        'Leads the Analog/Mixed-Signal Research Group (AMSG)',
        'Oversees student projects, prototypes, and silicon demonstrations',
        'Active in publishing and academic collaborations'
      ]
    },
    jeries: {
      name: 'Jeries Mattar',
      role: 'Graduate Researcher',
      img: 'assets/img/logo_amsg_2025.png',
      bio: 'Jeries received his B.Sc. in Electrical Engineering and Physics from the Technion in 2021 and is currently pursuing an M.Sc. in Electrical and Computer Engineering. His research focuses on mixed-signal computing for neural networks, exploring analog techniques for modern deep learning architectures, including time-domain compute and in-memory compute.',
      contact: {
        Email: 'jeriesmattar@campus.technion.ac.il',
        Office: '405 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: ''
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Investigates analog and mixed-signal processing for neural networks',
        'Works on time-domain and in-memory compute techniques for efficiency improvements'
      ]
    },
    yousef: {
      name: 'Yousef Safadi',
      role: 'Graduate Researcher',
      img: 'assets/img/logo_amsg_2025.png',
      bio: 'Yousef received his B.Sc. in Electrical Engineering from the Technion and is currently a graduate student focused on die-to-die (D2D) interfaces. He is interested in analog/mixed-signal design.',
      contact: {
        Email: 'yousefsafadi@campus.technion.ac.il',
        Office: '405 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: ''
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Works on die-to-die (D2D) interface research',
        'Explores analog/mixed-signal design techniques'
      ]
    },
    ofir: {
      name: 'Ofir Glick',
      role: 'Graduate Researcher',
      img: 'assets/img/logo_amsg_2025.png',
      bio: 'Ofir received his B.Sc. in Electrical Engineering from the Technion in 2024 and is currently an M.Sc. student working with Prof. Ariel Cohen and Dr. Nicolás Wainstein. He was previously an analog circuit designer at Cisco focusing on high-speed, low-power ADCs with digital calibration and mixed-signal verification.',
      contact: {
        Email: 'ofirglick@campus.technion.ac.il',
        Office: '412 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: ''
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Designs high-speed, low-power analog-to-digital converters',
        'Integrates digital calibration with analog circuit enhancements',
        'Works on schematic design, pre/post-layout simulation, and mixed-signal verification'
      ]
    },
    yinon: {
      name: 'Yinon Geva',
      role: 'Graduate Researcher',
      img: 'assets/img/logo_amsg_2025.png',
      bio: 'Yinon received his B.Sc. in Electrical and Computer Engineering from the Technion in 2024 and is currently an M.Sc. student. He is also a full-time digital IP design engineer at Intel, specializing in design-for-testability (DFT). His research focuses on high-speed, low-power die-to-die interfaces, CMOS circuit design, tapeout, and silicon measurement.',
      contact: {
        Email: 'yinongeva@campus.technion.ac.il',
        Office: '406 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: ''
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Focuses on mixed-signal circuit design for short-reach interconnects',
        'Works on CMOS circuit design, tapeout, and silicon measurement'
      ]
    },
    daniel: {
      name: 'Daniel Komenetsky',
      role: 'Graduate Researcher',
      img: 'https://ams.net.technion.ac.il/files/2026/03/Daniel-768x615.jpeg',
      bio: 'Daniel Komenetsky is an Analog IC Design Tech-Lead at Samsung Semiconductor, specializing in the design of advanced analog and mixed-signal integrated circuits for mobile imaging systems. His work focuses on power management architectures, low-noise voltage regulators, switched-capacitor circuits, and data converters, including column-parallel single-slope ADCs and current-steering DACs. He has experience leading full design cycles, from architecture and specifications definition through post-silicon validation. His current academic interests include high-speed time-based data converters for serial link applications, bridging advanced circuit research with silicon-proven industry practice.',
      contact: {
        Email: 'd.komenetsky@campus.technion.ac.il',
        Office: '405 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: ''
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Focuses on time-based data converters for serial links',
        'Bridges circuit research with silicon-proven industry practice'
      ]
    },
    mahmoud: {
      name: 'Mahmoud Mahajna',
      role: 'Graduate Researcher',
      img: 'assets/img/logo_amsg_2025.png',
      bio: 'Mahmoud is a M.Sc research student from the University of Politecnico di Torino in Italy, majoring in Electronics Engineering - Embedded Systems. He received his B.Sc degree in Electronics and Communication Engineering from Politecnico di Torino. He conducted a 6-month internship at The National Metrology Institute of Italy (INRiM) on the topic of Superconducting Single Photon Detectors. His current research interests are Computer Architecture, Neuromorphic Computing, Integrated Circuits and VLSI Systems.',
      contact: {
        Email: 'm-mahmoud@campus.technion.ac.il',
        Office: '411 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: ''
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Works on neuromorphic computing and VLSI systems',
        'Bridges embedded systems research with circuit design' 
      ]
    },
    dima: {
      name: 'Dima Ali Saleh',
      role: 'Graduate Researcher',
      img: 'assets/img/logo_amsg_2025.png',
      bio: 'Dima received her B.Sc. in Electrical Engineering from the Technion and is currently a graduate student at AMSG, specializing in time-domain in-memory computing (TD‑IMC). Her research interests include advancements in mixed-signal integrated circuit design.',
      contact: {
        Email: 'dima.al@campus.technion.ac.il',
        Office: '411 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: ''
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Specializes in time-domain in-memory computing (TD-IMC)',
        'Focuses on mixed-signal integrated circuit advancements'
      ]
    },
    sharon: {
      name: 'Sharon Ponarovsky',
      role: 'Graduate Researcher',
      img: 'assets/img/logo_amsg_2025.png',
      bio: 'Sharon Ponarovsky received her B.Sc. degree in Electrical Engineering from the Technion - Israel Institute of Technology, in 2024. During her B.Sc. studies, Sharon joined the Wireless Communication Solutions chip development team at Intel as a Logic Design Student Engineer. She is currently an M.Sc. student at the Andrew and Erna Faculty of Electrical and Computer Engineering,  Technion. At AMSG,  Sharon\'s research focuses on utilizing analog and mixed signal circuits to implement highly energy efficient Spiking Neural Networks (SNNs).',
      contact: {
        Email: 'sharon@technion.ac.il',
        Office: 'Viterbi ECE, Room 314',
        Phone: '+972 4 234 5680'
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Focuses on novel mixed-signal hardware directions',
        'Supports prototype development and characterization'
      ]
    },
    ilana: {
      name: 'Ilana Zilberger',
      role: 'Research Administrative Manager',
      img: 'https://ams.net.technion.ac.il/files/2025/12/team-pic-ilana.jpg',
      bio: 'Provides operational support, coordination, and administrative management for research activities and group logistics.',
      contact: {
        Email: 'ilanapirvu@ef.technion.ac.il',
        Office: '418 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: '+972-073378-7176'
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Manages research administration and grants support',
        'Coordinates meetings, events, and lab workflows'
      ]
    },
    michael: {
      name: 'Michael Sotman',
      role: 'Lab Engineer',
      img: 'https://ams.net.technion.ac.il/files/2026/03/Misha.jpg',
      bio: 'Michael Sotman received his B.Sc. (1996) and M.Sc. (2007) degree in Electrical Engineering from the Technion - Israel Institute of Technology. M.Sc. thesis is about On-die power distribution under supervision of Prof. Avinoam Kolodny. He has more than 25 years of experience in high-tech (Intel, Zoran, Mobileye) in various fields, mostly in Signal and Power Integrity design/validation on chip/platform level.',
      contact: {
        Email: 'michael@technion.ac.il',
        Office: '411 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: '+972 4 234 5682'  
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Supports hardware measurement and test setups',
        'Maintains lab equipment and facilities'
      ]
    },
    doron: {
      name: 'Doron Orenstein',
      role: 'Researcher',
      img: 'https://ams.net.technion.ac.il/files/2026/03/Doron.jpg',
      bio: 'Doron Orenstein is a senior computer architect with extensive industry experience and a parallel track in STEM education and science communication. He spent more than three decades at Intel as a lead engineer and architect and is an inventor on multiple patents spanning processor and instruction-set/microarchitecture topics. He also earned an M.A. at the Technion (2020), where his work addressed integrating authentic hi-tech problems into secondary-school mathematics teaching, connecting workplace modeling practices with school mathematics. He also serves as a reporter and content contributor on mathematics and technology for “Madaa Gadol Baktana” (Little Big Science).',
      contact: {
        Email: 'doron@technion.ac.il',
        Office: '411 Zisapel, Andrew and Erna Faculty of Electrical and Computer Engineering, Technion',
        Phone: '+972 4 234 5683'
      },
      links: {
        scholar: 'https://scholar.google.com',
        linkedin: 'https://www.linkedin.com'
      },
      details: [
        'Develops prototypes for mixed-signal research',
        'Assists with experiment design and data analysis'
      ]
    }
  };

  const openPersonModal = (id, cardElement) => {
    const data = peopleModalData[id];
    if (!data) return;

    modalName.textContent = data.name;
    modalRole.textContent = data.role;
    modalBio.textContent = data.bio;

    // Use the image from the card if available, otherwise fall back to the data object.
    const cardImg = cardElement?.querySelector('img');
    modalAvatar.src = cardImg?.src || data.img;
    modalAvatar.alt = cardImg?.alt || data.name;

    modalContactList.innerHTML = '';
    if (data.contact) {
      const icons = {
        Email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.5-8 5-8-5V6l8 5 8-5v2.5z"/></svg>',
        Phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1.05l-2.2 2.2z"/></svg>',
        Office: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4z" fill="none"/><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/><path d="M7 9h10v2H7zm0 4h7v2H7z"/></svg>'
      };

      Object.entries(data.contact).forEach(([label, value]) => {
        if (!value) return;
        const li = document.createElement('li');
        const icon = icons[label] || '';
        li.innerHTML = `${icon}<span><strong>${label}:</strong> ${value}</span>`;
        modalContactList.appendChild(li);
      });
    }

    if (modalScholarLink) {
      if (data.links?.scholar) {
        modalScholarLink.href = data.links.scholar;
        modalScholarLink.style.display = 'inline-flex';
      } else {
        modalScholarLink.style.display = 'none';
      }
    }

    if (modalLinkedInLink) {
      if (data.links?.linkedin) {
        modalLinkedInLink.href = data.links.linkedin;
        modalLinkedInLink.style.display = 'inline-flex';
      } else {
        modalLinkedInLink.style.display = 'none';
      }
    }

    personModal.classList.add('active');
    personModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closePersonModal = () => {
    personModal.classList.remove('active');
    personModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-person-id]').forEach(card => {
    card.addEventListener('click', () => openPersonModal(card.dataset.personId, card));
  });

  personModal.addEventListener('click', (event) => {
    if (event.target === personModal || event.target.closest('[data-modal-close]')) {
      closePersonModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePersonModal();
  });
}

/* Modal (research topic) */
const topicModal = document.getElementById('topic-modal');
if (topicModal) {
  const topicModalTitle = topicModal.querySelector('.modal-name');
  const topicModalBio = topicModal.querySelector('.modal-bio');
  const topicModalAvatar = topicModal.querySelector('.modal-avatar');
  const topicModalLearnMoreLink = topicModal.querySelector('[data-link="learn-more"]');

  const topicModalData = {
    'in-memory': {
      title: 'In-Memory Computing',
      body: 'Architectures and macros that reduce data movement by co-locating storage and computation. Research emphasizes mixed-signal and time-domain interfaces, non-volatile memory technologies, and algorithm-aware design tradeoffs that enable scalable and energy-efficient compute fabrics. Focus areas include compute-in-memory architectures using CMOS and beyond-CMOS memory technologies, time-domain sensing/readout/compute interfaces, and energy-efficiency/precision/array-level integration tradeoffs.',
      learnMoreHref: 'publications.html',
      learnMoreLabel: 'Learn more'
    },
    'accelerators': {
      title: 'AI Hardware Accelerators',
      body: 'Custom accelerator architectures for ANN and neuromorphic workloads, spanning circuit techniques, compute macros, and system-level integration. This direction includes mixed-signal and time-domain hardware approaches tailored for energy-efficient edge intelligence and next-generation AI systems. Focus areas include edge-oriented and energy-aware accelerator design, hybrid analog/digital and time-domain acceleration, and macro-to-system integration with workload-aware optimization.',
      learnMoreHref: 'publications.html',
      learnMoreLabel: 'Learn more'
    },
    'data-converters': {
      title: 'Data Converters',
      body: 'Mixed-signal interfaces that translate information across voltage, current, digital, and time domains. Research includes both conventional and application-specific converter architectures, with emphasis on energy efficiency, calibration, and integration with sensing and compute macros. Topics include ADC/DAC architectures for mixed-signal systems, voltage-to-time and time-to-digital conversion techniques, and linearity/noise/bandwidth/calibration tradeoffs.',
      learnMoreHref: 'publications.html',
      learnMoreLabel: 'Learn more'
    },
    'clock-generation': {
      title: 'Clock Generation Circuits',
      body: 'Timing-generation and synchronization circuits for mixed-signal, compute, and high-speed link applications. Research focuses on robust clock synthesis, alignment, and distribution techniques that sustain performance under jitter, mismatch, and PVT variability. Core directions include PLL/DLL-based clock synthesis and timing recovery, multi-phase generation with phase alignment and deskew, and low-jitter design with calibration and implementation robustness.',
      learnMoreHref: 'publications.html',
      learnMoreLabel: 'Learn more'
    },
    'd2d-links': {
      title: 'Ultra-Dense D2D & C2C Links',
      body: 'Energy-efficient interface circuits for high-speed die-to-die and chip-to-chip communication in chiplet-based systems. Research includes signaling and receiver architectures, clock/reference generation and distribution, crosstalk-aware operation, and calibration techniques for robust communication over ultra-dense short-reach channels. Topics cover low-swing and inverter-based signaling, equalization/clocking/reference distribution strategies, and crosstalk mitigation with package-aware calibration.',
      learnMoreHref: 'publications.html',
      learnMoreLabel: 'Learn more'
    }
  };

  const openTopicModal = (id) => {
    const data = topicModalData[id];
    if (!data) return;

    topicModalTitle.textContent = data.title;
    topicModalBio.textContent = data.body;

    // No topic avatar by default
    topicModalAvatar.style.display = 'none';

    if (topicModalLearnMoreLink) {
      topicModalLearnMoreLink.href = data.learnMoreHref || 'publications.html';
      topicModalLearnMoreLink.textContent = data.learnMoreLabel || 'Learn more';
    }

    topicModal.classList.add('active');
    topicModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeTopicModal = () => {
    topicModal.classList.remove('active');
    topicModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-topic-id]').forEach(card => {
    card.addEventListener('click', () => openTopicModal(card.dataset.topicId));
  });

  topicModal.addEventListener('click', (event) => {
    if (event.target === topicModal || event.target.closest('[data-modal-close]')) {
      closeTopicModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeTopicModal();
  });
}

/* Modal (undergraduate project detail) */
const projectModal = document.getElementById('project-modal');
if (projectModal) {
  const projectModalTitle = projectModal.querySelector('.modal-name');
  const projectModalRole = projectModal.querySelector('.modal-role');
  const projectModalBio = projectModal.querySelector('.modal-bio');
  const projectModalStatus = document.getElementById('project-modal-status');
  const projectModalSourceNote = projectModal.querySelector('.modal-source-note');
  const projectModalContactLink = projectModal.querySelector('.modal-contact-link');

  const projectModalData = {
    'spi-ann': {
      title: 'Design of Serial Peripheral Interface (SPI) for an Artificial Neural Network Accelerator in 180 nm CMOS',
      supervisor: 'Dr. Nicolás Wainstein',
      status: 'Taken',
      statusClass: 'project-status--taken',
      body: 'Focuses on the design of an SPI communication interface for a 180 nm CMOS neural-network accelerator, covering digital interface behavior, integration constraints, and hardware bring-up considerations.',
      sourceNote: 'Expertise: AMS circuits, VLSI, data converters, links, wireline',
      email: 'nico@technion.ac.il'
    },
    'bnn-backend-riscv': {
      title: 'FeFET-Based Time-Domain Compute-in-Memory BNN Accelerator Backend Design with MIPS/RISC-V Integration',
      supervisor: 'Jeries Mattar',
      status: 'Open',
      statusClass: 'project-status--open',
      body: 'Targets backend design work for a FeFET-based time-domain compute-in-memory binary neural network accelerator, with emphasis on digital integration around a MIPS or RISC-V environment.',
      sourceNote: 'Expertise: computer architecture, VLSI, algorithms',
      email: 'jeriesmattar@campus.technion.ac.il'
    },
    'ann-simulator': {
      title: 'Simulator for Time-Domain Compute-in-Memory ANN Accelerators',
      supervisor: 'Jeries Mattar',
      status: 'Open',
      statusClass: 'project-status--open',
      body: 'Centers on building or extending a simulator for time-domain compute-in-memory ANN accelerators to study performance, accuracy, and architecture-level tradeoffs before implementation.',
      sourceNote: 'Expertise: algorithms, computer architecture',
      email: 'jeriesmattar@campus.technion.ac.il'
    },
    'parallel-interface-ann': {
      title: 'Design of a Parallel Interface for an Artificial Neural Network Accelerator in 180 nm',
      supervisor: 'Dr. Nicolás Wainstein',
      status: 'Closed',
      statusClass: 'project-status--closed',
      body: 'Covers the design of a parallel data interface for a 180 nm ANN accelerator, including digital communication structure, timing behavior, and compatibility with the accelerator datapath.',
      sourceNote: 'Expertise: AMS circuits, VLSI, data converters, links, wireline, high-speed',
      email: 'nico@technion.ac.il'
    },
    'fefet-ring-oscillator': {
      title: 'FeFET-based Ring Oscillator in 28 nm CMOS',
      supervisor: 'Jeries Mattar',
      status: 'Open',
      statusClass: 'project-status--open',
      body: 'Explores the design and evaluation of a FeFET-based ring oscillator in 28 nm CMOS, with likely emphasis on timing behavior, device-aware design, and circuit-level characterization.',
      sourceNote: 'Expertise: AMS circuits, VLSI, clocking circuits',
      email: 'jeriesmattar@campus.technion.ac.il'
    },
    'bnn-controller': {
      title: 'Controller for FeFET-Based Time-Domain Compute-in-Memory Binary Neural Networks Accelerator',
      supervisor: 'Jeries Mattar',
      status: 'Taken',
      statusClass: 'project-status--taken',
      body: 'Addresses controller design for a FeFET-based time-domain compute-in-memory BNN accelerator, coordinating operation flow, interface signaling, and system integration.',
      sourceNote: 'Expertise: computer architecture, VLSI, algorithms',
      email: 'jeriesmattar@campus.technion.ac.il'
    },
    'logic-mac': {
      title: 'FeFET-Based Time-Domain Compute-in-Memory Logic Design and MAC Implementation',
      supervisor: 'Jeries Mattar',
      status: 'Taken',
      statusClass: 'project-status--taken',
      body: 'Focuses on logic-design work and multiply-accumulate building blocks for a FeFET-based time-domain compute-in-memory architecture, connecting algorithmic needs to digital and mixed-signal implementation.',
      sourceNote: 'Expertise: VLSI, algorithms, computer architecture',
      email: 'jeriesmattar@campus.technion.ac.il'
    },
    'vtc-yflash': {
      title: 'Design of Voltage-to-Time Converter for Y-Flash Based Time-Domain Compute-in-Memory ANN Accelerator',
      supervisor: 'Jeries Mattar',
      status: 'Taken',
      statusClass: 'project-status--taken',
      body: 'Targets the design of a voltage-to-time converter for a Y-Flash-based time-domain compute-in-memory ANN accelerator, likely emphasizing analog front-end conversion accuracy and circuit robustness.',
      sourceNote: 'Expertise: AMS circuits, data converters, clocking circuits',
      email: 'jeriesmattar@campus.technion.ac.il'
    },
    'backend-design': {
      title: 'FeFET-Based Time-Domain Compute-in-Memory Backend Design',
      supervisor: 'Jeries Mattar',
      status: 'Taken',
      statusClass: 'project-status--taken',
      body: 'Covers backend design work for a FeFET-based time-domain compute-in-memory project, with likely tasks around physical implementation, integration, and signoff-oriented design flow.',
      sourceNote: 'Expertise: VLSI, computer architecture',
      email: 'jeriesmattar@campus.technion.ac.il'
    },
    'tdc-dll': {
      title: 'Design of Time to Digital Converter with Delay-Locked Loop',
      supervisor: 'Jeries Mattar',
      status: 'Taken',
      statusClass: 'project-status--taken',
      body: 'Focuses on a time-to-digital converter architecture that incorporates a delay-locked loop, combining timing-circuit concepts with calibration and measurement-oriented design.',
      sourceNote: 'Expertise: AMS circuits, data converters, clocking circuits',
      email: 'jeriesmattar@campus.technion.ac.il'
    }
  };

  const openProjectModal = (id) => {
    const data = projectModalData[id];
    if (!data) return;

    projectModalTitle.textContent = data.title;
    projectModalRole.textContent = `Supervisor: ${data.supervisor}`;
    projectModalBio.textContent = data.body;
    projectModalSourceNote.textContent = data.sourceNote || 'Source: AMS Group';

    if (projectModalContactLink) {
      projectModalContactLink.href = `mailto:${data.email}`;
      projectModalContactLink.textContent = 'Contact Supervisor';
    }

    if (projectModalStatus) {
      projectModalStatus.textContent = data.status;
      projectModalStatus.className = `eyebrow project-status ${data.statusClass || ''}`.trim();
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-project-id]').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.dataset.projectId));
  });

  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal || event.target.closest('[data-modal-close]')) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeProjectModal();
  });
}

/* Modal (news detail) */
const newsModal = document.getElementById('news-modal');
if (newsModal) {
  const newsModalTitle = newsModal.querySelector('.modal-name');
  const newsModalBio = newsModal.querySelector('.modal-bio');
  const newsModalAvatar = newsModal.querySelector('.modal-avatar img');
  const newsModalCarousel = newsModal.querySelector('.modal-carousel');
  const newsModalCarouselImg = newsModal.querySelector('.carousel-image');
  const newsModalCarouselPrev = newsModal.querySelector('.carousel-prev');
  const newsModalCarouselNext = newsModal.querySelector('.carousel-next');

  let newsCarouselIndex = 0;
  let newsCarouselImages = [];

  const setCarouselImage = (index) => {
    if (!newsCarouselImages.length) return;
    newsCarouselIndex = Math.max(0, Math.min(index, newsCarouselImages.length - 1));
    newsModalCarouselImg.src = newsCarouselImages[newsCarouselIndex];
    newsModalCarouselImg.alt = `${newsModalTitle.textContent} (${newsCarouselIndex + 1}/${newsCarouselImages.length})`;
    newsModalCarouselPrev.disabled = newsCarouselIndex === 0;
    newsModalCarouselNext.disabled = newsCarouselIndex === newsCarouselImages.length - 1;
  };

  const showCarousel = (images) => {
    newsCarouselImages = images || [];
    if (!newsCarouselImages.length) {
      newsModalCarousel.hidden = true;
      return;
    }
    newsModalCarousel.hidden = false;
    setCarouselImage(0);
  };

  const openNewsModal = (id) => {
    const data = NEWS_ITEMS_MAP[id];
    if (!data) return;

    newsModalTitle.textContent = data.title;
    newsModalBio.textContent = data.details.join(' ');

    // Image carousel support (for multiple images)
    if (Array.isArray(data.images) && data.images.length) {
      showCarousel(data.images);
      newsModalAvatar.closest('.modal-avatar').style.display = 'none';
    } else if (data.img) {
      newsModalAvatar.src = data.img;
      newsModalAvatar.alt = data.title;
      newsModalAvatar.closest('.modal-avatar').style.display = 'block';
      newsModalCarousel.hidden = true;
    } else {
      newsModalAvatar.src = '';
      newsModalAvatar.alt = '';
      newsModalAvatar.closest('.modal-avatar').style.display = 'none';
      newsModalCarousel.hidden = true;
    }

    newsModal.classList.add('active');
    newsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  newsModalCarouselPrev.addEventListener('click', () => setCarouselImage(newsCarouselIndex - 1));
  newsModalCarouselNext.addEventListener('click', () => setCarouselImage(newsCarouselIndex + 1));

  const closeNewsModal = () => {
    newsModal.classList.remove('active');
    newsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-news-id]').forEach(card => {
    card.addEventListener('click', () => openNewsModal(card.dataset.newsId));
  });

  newsModal.addEventListener('click', (event) => {
    if (event.target === newsModal || event.target.closest('[data-modal-close]')) {
      closeNewsModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNewsModal();
  });
}
