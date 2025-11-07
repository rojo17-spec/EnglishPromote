// script.js
// Pequeñas funciones que no cambian la naturaleza estática de la página:
// - rellenar año en el footer
// - "Fade-in" de secciones al hacer scroll (IntersectionObserver)
// No hay navegación externa ni interacción avanzada.

document.addEventListener('DOMContentLoaded', function () {
  // Insertar año actual en footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // IntersectionObserver para revelar elementos con clase .appear
  const appearOptions = {
    threshold: 0.12
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // revelar solo una vez
      }
    });
  }, appearOptions);

  document.querySelectorAll('.appear').forEach(el => {
    appearOnScroll.observe(el);
  });

  // Mejora de navegación: anclas internas con comportamiento suave (CSS también puede hacerlo con scroll-behavior)
  // Nota: es puramente visual, no convierte la página en interactiva.
  // (No usamos librerías externas)
  const prefersSmooth = 'scrollBehavior' in document.documentElement.style;
  if (!prefersSmooth) {
    // fallback simple para navegadores antiguos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
});

// Menú hamburguesa funcional
const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
