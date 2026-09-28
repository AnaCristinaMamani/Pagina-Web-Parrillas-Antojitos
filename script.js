// =========================================================
// ANTOJITOS — interacciones del frontend
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú hamburguesa (móvil) ---------- */
  const navToggle = document.getElementById('navToggle');
  const header = document.getElementById('siteHeader');

  navToggle?.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => header.classList.remove('nav-open'));
  });

  /* ---------- Carrusel automático del hero ---------- */
  const track = document.getElementById('autoCarousel');
  const slides = track ? Array.from(track.querySelectorAll('.slide')) : [];
  const dotsWrap = document.getElementById('autoDots');
  const prevBtn = document.getElementById('autoPrev');
  const nextBtn = document.getElementById('autoNext');

  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 4500;

  if (slides.length) {
    // Genera los puntos indicadores
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.children);

    function goToSlide(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }

    function nextSlide() { goToSlide(current + 1); }
    function prevSlide() { goToSlide(current - 1); }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    nextBtn?.addEventListener('click', () => { nextSlide(); startAutoplay(); });
    prevBtn?.addEventListener('click', () => { prevSlide(); startAutoplay(); });

    const carouselSection = document.querySelector('.carrusel-section');
    carouselSection?.addEventListener('mouseenter', stopAutoplay);
    carouselSection?.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  /* ---------- Tabs de la carta ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-grid');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.cat;

      tabButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      panels.forEach(panel => {
        panel.classList.toggle('is-active', panel.dataset.panel === target);
      });
    });
  });

  /* ---------- Login / registro (sección delivery) ---------- */
  const loginTabs = document.querySelectorAll('.login-tab');
  const loginForms = document.querySelectorAll('.login-form');

  loginTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.form;

      loginTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      loginForms.forEach(form => {
        form.classList.toggle('is-active', form.dataset.form === target);
      });
    });
  });

  /* ---------- Envío de formularios (placeholder, sin backend aún) ---------- */
  document.getElementById('signinForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Conecta este formulario a tu backend para iniciar sesión de verdad.');
  });

  document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Conecta este formulario a tu backend para crear la cuenta.');
  });

  document.getElementById('modalForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Conecta este formulario a tu backend para iniciar sesión de verdad.');
  });

  /* ---------- Modal de login rápido (header) ---------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const openLoginBtn = document.getElementById('openLogin');
  const modalClose = document.getElementById('modalClose');

  const openModal = () => {
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  openLoginBtn?.addEventListener('click', openModal);
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- Animación al aparecer las secciones ---------- */
  const revealTargets = document.querySelectorAll(
    '.nosotros-inner, .menu-grid, .gallery-item, .delivery-inner, .contacto-inner'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

});
