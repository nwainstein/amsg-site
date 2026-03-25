const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

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
renderNewsCards(document.getElementById('index-news-preview'), NEWS_ITEMS.slice(0, 3), { preview: true });

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
    startAutoCollapse();
  });

  updateThemeButton();
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
    'time-domain': {
      title: 'Time-Domain Computing',
      body: 'Design of mixed-signal computational primitives that encode information in delay, pulse width, phase, or timing trajectories. This direction connects data conversion, low-energy processing, and hardware-efficient machine learning. Topics include time-domain arithmetic, TDC/VTC/DLL-inspired building blocks, and techniques for calibration, PVT robustness, and implementation scalability.',
      learnMoreHref: 'publications.html',
      learnMoreLabel: 'Learn more'
    },
    'in-memory': {
      title: 'In-Memory Computing',
      body: 'Architectures and macros that reduce data movement by co-locating storage and computation. Emphasis is placed on mixed-signal interfaces, time-domain readout, non-volatile devices, and algorithm-aware tradeoffs. Key themes include FeFET/NVM-compatible compute fabrics, crossbar-inspired and CAM-based macro concepts, and energy/precision/integration tradeoffs.',
      learnMoreHref: 'publications.html',
      learnMoreLabel: 'Learn more'
    },
    'accelerators': {
      title: 'AI Hardware Accelerators',
      body: 'Custom accelerator concepts for ANN and neuromorphic workloads, bridging circuits and system-level efficiency. The theme can expand with project pages, test chips, and benchmark summaries. Focus areas include edge-oriented energy-aware hardware, hybrid analog/digital acceleration, and macro-to-system integration strategies.',
      learnMoreHref: 'publications.html',
      learnMoreLabel: 'Learn more'
    },
    'd2d-links': {
      title: 'Ultra-Dense D2D & C2C Links',
      body: 'Short-reach transceivers and clocking techniques for chiplet and advanced-package systems. Research includes signaling efficiency, interface constraints, and link architectures suited to dense integration. Topics cover inverter-based and low-swing short-reach links, clocking/forwarding/equalization tradeoffs, and design-for-test and package-aware constraints.',
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
