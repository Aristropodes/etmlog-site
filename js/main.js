/* ============================================================
   ETMLOG · Site Institucional · main.js
   Menu mobile, header on scroll, animações reveal, formulário
   ============================================================ */

(function () {
  'use strict';

  /* -------- Header com efeito de scroll -------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------- Menu mobile -------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Fecha ao clicar em qualquer link
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------- Animação reveal on scroll -------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* -------- Ano dinâmico no rodapé -------- */
  const yearEls = document.querySelectorAll('#year');
  const y = new Date().getFullYear();
  yearEls.forEach(el => { el.textContent = y; });

  /* -------- Formulário de contato -------- */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();

      // validação simples
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(f => {
        if (!f.value.trim()) {
          f.style.borderColor = '#F27507';
          valid = false;
        } else {
          f.style.borderColor = '';
        }
      });

      if (!valid) {
        if (feedback) {
          feedback.textContent = '// preencha os campos obrigatórios antes de enviar';
          feedback.style.background = 'rgba(242, 117, 7, .14)';
          feedback.style.color = '#ffb46d';
          feedback.classList.add('show');
        }
        return;
      }

      // Composição da mensagem para o WhatsApp
      const nome     = (form.nome?.value || '').trim();
      const empresa  = (form.empresa?.value || '').trim();
      const email    = (form.email?.value || '').trim();
      const telefone = (form.telefone?.value || '').trim();
      const assunto  = (form.assunto?.value || '').trim();
      const mensagem = (form.mensagem?.value || '').trim();

      const linhas = [
        'Olá, ETMLOG. Vim pelo site e gostaria de falar com a equipe.',
        '',
        `Nome: ${nome}`,
        empresa ? `Empresa: ${empresa}` : null,
        `E-mail: ${email}`,
        telefone ? `Telefone: ${telefone}` : null,
        assunto ? `Assunto: ${assunto}` : null,
        '',
        'Mensagem:',
        mensagem
      ].filter(Boolean).join('\n');

      const url = 'https://wa.me/5511911429001?text=' + encodeURIComponent(linhas);

      if (feedback) {
        feedback.textContent = '// mensagem registrada · redirecionando ao WhatsApp...';
        feedback.style.background = 'rgba(34, 197, 94, .14)';
        feedback.style.color = '#86efac';
        feedback.classList.add('show');
      }

      setTimeout(() => {
        window.open(url, '_blank', 'noopener');
        form.reset();
        setTimeout(() => {
          if (feedback) feedback.classList.remove('show');
        }, 4000);
      }, 700);
    });
  }

  /* -------- Smooth scroll para âncoras internas -------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });


  /* -------- Clientes · marquee infinito -------- */
  const clientTrack = document.getElementById('clientTrack');
  if (clientTrack) {
    const group = clientTrack.querySelector('.client-track__group');
    if (group) {
      const clone = group.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clientTrack.appendChild(clone);
    }
  }

})();
