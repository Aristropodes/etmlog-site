/* ============================================
   ETMLOG · Site Institucional — interações JS
   ============================================ */

(function () {
  'use strict';

  // ---------- Menu mobile ----------
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('navScroll');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // ---------- Header sombra ao rolar ----------
  const bar = document.querySelector('.bar');
  if (bar) {
    const onScroll = () => {
      if (window.scrollY > 6) bar.classList.add('scrolled');
      else bar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Reveal on scroll ----------
  const targets = document.querySelectorAll(
    '.section, .hero-grid, .slogan-strip, .about-grid, .svc-grid > .svc, ' +
    '.diff-grid > .diff, .values > .val, .quote-block, .client-area, ' +
    '.tech-block, .tagline-feature, .contact-grid'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('in'));
  }

  // ---------- Smooth scroll para links âncora ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;
    a.addEventListener('click', (ev) => {
      const target = document.querySelector(href);
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Formulários (envio simulado) ----------
  function handleForm(formId, msg) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // Validação simples
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach((f) => {
        if (!String(f.value || '').trim()) {
          f.style.borderColor = '#ff6f6f';
          ok = false;
        } else {
          f.style.borderColor = '';
        }
      });
      if (!ok) return;

      // Feedback visual
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Enviando…';
        setTimeout(() => {
          btn.innerHTML = '✓ Enviado · responderemos em até 2h úteis';
          btn.style.background = '#19a957';
          setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            btn.style.background = '';
            form.reset();
            alert(msg);
          }, 1800);
        }, 700);
      }
    });
  }

  handleForm('quickQuote', 'Sua cotação rápida foi enviada! Em até 2h úteis nossa equipe entra em contato.');
  handleForm('fullQuote', 'Sua solicitação de cotação foi enviada! Em até 2h úteis nossa equipe comercial entra em contato.');
  handleForm('contactForm', 'Mensagem enviada com sucesso! Em até 2h úteis nossa equipe entra em contato.');

  // ---------- Highlight de seção ativa no menu (Home) ----------
  const navLinks = document.querySelectorAll('.bar-nav a[href^="#"]');
  if (navLinks.length) {
    const sections = Array.from(navLinks)
      .map((l) => document.querySelector(l.getAttribute('href')))
      .filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = '#' + e.target.id;
            navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
  }
})();
