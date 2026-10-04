/**
 * Aaditya Mathur Portfolio - Main Interaction Engine
 * Manages cursor inertia, navigation spy, 3D tilt, terminal emulator,
 * skill modal viewer, contact form validation, and cinematic intro.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Cinematic Intro Screen Handling
  const introEl = document.getElementById('cinematic-intro');
  const skipBtn = document.getElementById('skip-intro-btn');

  function dismissIntro() {
    if (!introEl || introEl.style.display === 'none') return;
    introEl.style.opacity = '0';
    setTimeout(() => {
      introEl.style.display = 'none';
    }, 450);
  }

  if (introEl) {
    const timer = setTimeout(dismissIntro, 1450);
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearTimeout(timer);
        dismissIntro();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        clearTimeout(timer);
        dismissIntro();
      }
    });
  }

  // 2. Custom Inertia Cursor (Desktop Only)
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cursorDot && cursorRing && !isTouchDevice && !prefersReducedMotion) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursorRing);
    }
    requestAnimationFrame(renderCursorRing);

    // Hover states for interactive elements
    const interactiveSelectors = 'a, button, input, textarea, .skill-card, .hobby-card, .draggable-chip, .term-btn';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });
  }

  // 3. Scroll Progress Indicator & Sticky Nav Active Spy
  const progressBar = document.getElementById('scroll-progress-bar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scroll progress bar
    if (progressBar) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / (height || 1)) * 100;
      progressBar.style.width = `${scrolled}%`;
    }

    // Scroll spy for navigation
    let currentSectionId = 'home';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      const scroll = window.scrollY;
      if (scroll >= top && scroll < bottom) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute('data-section') === currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // 4. Mobile Navigation Drawer Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        mobileBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu when clicking any link
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 5. Magnetic Buttons
  if (!isTouchDevice && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic-btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.25;
        const deltaY = (e.clientY - centerY) * 0.25;
        btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // 6. Interactive 3D Card Tilt (Hobby & Profile Cards)
  if (!isTouchDevice && !prefersReducedMotion) {
    document.querySelectorAll('.tilt-target').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // 7. Interactive Terminal (AADITYA_TERMINAL)
  const termForm = document.getElementById('terminal-form');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output-stream');
  const termBody = document.getElementById('terminal-body');

  function executeTerminalCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Echo user input
    const commandRow = document.createElement('div');
    commandRow.className = 'text-blue-300 font-semibold mt-2';
    commandRow.innerHTML = `<span class="text-blue-500">aaditya@jecrc:~$</span> ${escapeHTML(rawCmd)}`;
    termOutput.appendChild(commandRow);

    const responseRow = document.createElement('div');
    responseRow.className = 'text-slate-300 text-xs mt-0.5 leading-relaxed pl-2 border-l border-blue-500/40';

    if (cmd === 'clear') {
      termOutput.innerHTML = '';
      if (termInput) termInput.value = '';
      return;
    }

    const commandsMap = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.terminal && PORTFOLIO_DATA.terminal.commands)
      ? PORTFOLIO_DATA.terminal.commands
      : {
          whoami: "Aaditya Mathur — First-Year B.Tech Student at JECRC University, Jaipur.",
          focus: "Artificial Intelligence + Technology",
          current_status: "Learning & Building",
          location: "Jaipur, Rajasthan, India",
          about: "Curious student exploring modern AI, prompt engineering, and digital workflows.",
          skills: "AI Fundamentals, Generative AI, Prompt Engineering, Digital Productivity, Basic Web Dev",
          education: "JECRC University, Jaipur (B.Tech First Year — Current). School details coming soon.",
          contact: "Email: your.email@example.com | Phone: +91 XXXXX XXXXX (Placeholders)",
          mission: "LEARNING → EXPERIMENTING → BUILDING → IMPROVING",
          help: "Available commands: whoami, focus, current_status, location, about, skills, education, mission, contact, clear"
        };

    if (commandsMap[cmd]) {
      responseRow.innerHTML = commandsMap[cmd];
    } else {
      responseRow.innerHTML = `<span class="text-red-400">Command not found: '${escapeHTML(cmd)}'.</span> Type <span class="text-blue-400 font-bold">help</span> to view available queries.`;
    }

    termOutput.appendChild(responseRow);
    if (termBody) termBody.scrollTop = termBody.scrollHeight;
    if (termInput) termInput.value = '';
  }

  if (termForm && termInput) {
    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeTerminalCommand(termInput.value);
    });
  }

  // Predefined quick command buttons
  document.querySelectorAll('.term-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeTerminalCommand(cmd);
    });
  });

  // 8. Interactive Skill Matrix Modal Dialog
  const skillModal = document.getElementById('skill-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOkBtn = document.getElementById('modal-ok-btn');
  const modalSkillTitle = document.getElementById('modal-skill-title');
  const modalSkillDesc = document.getElementById('modal-skill-desc');
  const modalSkillCat = document.getElementById('modal-skill-category');
  const modalSkillIcon = document.getElementById('modal-skill-icon');

  function openSkillModal(skillId) {
    if (!skillModal) return;
    const skillsList = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.skillsAndHobbies)
      ? PORTFOLIO_DATA.skillsAndHobbies.skills
      : [];
    
    const skillData = skillsList.find((s) => s.id === skillId);
    if (skillData) {
      if (modalSkillTitle) modalSkillTitle.textContent = skillData.name;
      if (modalSkillDesc) modalSkillDesc.textContent = skillData.fullDesc || skillData.shortDesc;
      if (modalSkillCat) modalSkillCat.textContent = skillData.category.toUpperCase();
      if (modalSkillIcon) {
        modalSkillIcon.innerHTML = `<span class="text-xs font-mono font-bold">${skillData.name.substring(0, 2).toUpperCase()}</span>`;
      }
      skillModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSkillModal() {
    if (!skillModal) return;
    skillModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.skill-card').forEach((card) => {
    card.addEventListener('click', () => {
      const skillId = card.getAttribute('data-skill-id');
      if (skillId) openSkillModal(skillId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeSkillModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeSkillModal);
  if (skillModal) {
    skillModal.addEventListener('click', (e) => {
      if (e.target === skillModal) closeSkillModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSkillModal();
  });

  // 9. Interactive Contact Form with Validation & Feedback States
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnIcon = document.getElementById('btn-icon');
  const btnSpinner = document.getElementById('btn-spinner');
  const formAlert = document.getElementById('form-alert');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showInputError(input, hasError) {
    const errorEl = input.parentElement.querySelector('.error-text');
    if (hasError) {
      input.classList.add('border-red-500');
      if (errorEl) errorEl.classList.remove('hidden');
    } else {
      input.classList.remove('border-red-500');
      if (errorEl) errorEl.classList.add('hidden');
    }
  }

  if (contactForm) {
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        showInputError(input, false);
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      if (!nameInput.value.trim()) {
        showInputError(nameInput, true);
        isValid = false;
      } else {
        showInputError(nameInput, false);
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        showInputError(emailInput, true);
        isValid = false;
      } else {
        showInputError(emailInput, false);
      }

      if (!messageInput.value.trim()) {
        showInputError(messageInput, true);
        isValid = false;
      } else {
        showInputError(messageInput, false);
      }

      if (!isValid) return;

      // Loading state
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Transmitting Message...';
      if (btnIcon) btnIcon.classList.add('hidden');
      if (btnSpinner) btnSpinner.classList.remove('hidden');

      // Simulated dispatch delay
      setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (btnIcon) btnIcon.classList.remove('hidden');
        if (btnSpinner) btnSpinner.classList.add('hidden');

        if (formAlert) {
          formAlert.className = 'mb-6 p-4 rounded-xl text-xs font-mono bg-emerald-950/60 border border-emerald-800 text-emerald-300';
          formAlert.innerHTML = `
            <div class="font-bold text-sm mb-1">Message Dispatched (Simulation)</div>
            <div>Thank you, <strong>${escapeHTML(nameInput.value.trim())}</strong>! This demo form is ready for backend integration (e.g. Formspree / EmailJS). Contact placeholders can be updated in <code class="text-white">js/data.js</code>.</div>
          `;
          formAlert.classList.remove('hidden');
        }

        contactForm.reset();
      }, 850);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

});
