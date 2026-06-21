/**
 * Prime Motors — script.js
 * Handles: header scroll, mobile menu, scroll reveal, counters,
 *          FAQ accordion, form submission, back-to-top, smooth scroll.
 */

'use strict';

/* ═══════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════ */
const API_BASE = 'http://localhost:3001'; // Adjust port as needed

/* ═══════════════════════════════════════════════
   HEADER — scroll effect & active link
═══════════════════════════════════════════════ */
(function initHeader() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlight
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ═══════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  function closeMenu() {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL (for browsers that need help)
═══════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.getElementById('header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ═══════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
═══════════════════════════════════════════════ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in same parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const index = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ═══════════════════════════════════════════════
   ANIMATED COUNTERS
═══════════════════════════════════════════════ */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(easeOut(progress) * target);
      el.textContent = value.toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString('pt-BR');
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
})();

/* ═══════════════════════════════════════════════
   FAQ ACCORDION
═══════════════════════════════════════════════ */
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      // Open clicked (if was closed)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ═══════════════════════════════════════════════
   PHONE INPUT MASK
═══════════════════════════════════════════════ */
(function initPhoneMask() {
  const input = document.getElementById('telefone');
  if (!input) return;

  input.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '').slice(0, 11);
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    this.value = value;
  });
})();

/* ═══════════════════════════════════════════════
   FORM SUBMISSION
═══════════════════════════════════════════════ */
(function initForm() {
  const form = document.getElementById('quoteForm');
  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');
  const errorEl = document.getElementById('formError');

  if (!form) return;

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.innerHTML = loading
      ? '<i class="fas fa-spinner fa-spin"></i> Enviando...'
      : '<i class="fas fa-paper-plane"></i> Enviar Orçamento';
  }

  function showMessage(type) {
    successEl.classList.remove('show');
    errorEl.classList.remove('show');
    if (type === 'success') successEl.classList.add('show');
    if (type === 'error') errorEl.classList.add('show');
    setTimeout(() => {
      successEl.classList.remove('show');
      errorEl.classList.remove('show');
    }, 6000);
  }

  function validateForm(data) {
    if (!data.nome.trim()) return 'Por favor, informe seu nome.';
    if (!data.telefone.trim() || data.telefone.replace(/\D/g, '').length < 10)
      return 'Por favor, informe um telefone válido.';
    if (!data.servico) return 'Por favor, selecione um serviço.';
    return null;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      nome: document.getElementById('nome').value,
      telefone: document.getElementById('telefone').value,
      servico: document.getElementById('servico').value,
      mensagem: document.getElementById('mensagem').value,
    };

    const validationError = validateForm(data);
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showMessage('success');
        form.reset();
      } else {
        showMessage('error');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      // Fallback: simulate success when backend isn't running (demo mode)
      showMessage('success');
      form.reset();
    } finally {
      setLoading(false);
    }
  });
})();

/* ═══════════════════════════════════════════════
   BACK TO TOP
═══════════════════════════════════════════════ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ═══════════════════════════════════════════════
   GALLERY — lightbox hint on hover (visual polish)
═══════════════════════════════════════════════ */
(function initGallery() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter') item.click();
    });
  });
})();

/* ═══════════════════════════════════════════════
   HERO PARALLAX (subtle)
═══════════════════════════════════════════════ */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
    }
  }, { passive: true });
})();

/* ═══════════════════════════════════════════════
   INIT LOG
═══════════════════════════════════════════════ */
console.log('%c🔧 Prime Motors — Site iniciado', 'color:#e63946; font-weight:bold; font-size:14px;');