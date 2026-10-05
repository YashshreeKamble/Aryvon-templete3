document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('nav-open');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const revealTargets = document.querySelectorAll(
    '.editorial-intro-main, .editorial-side-note, .editorial-section-head, .editorial-card, .editorial-method-heading, .editorial-steps li, .editorial-cta-inner, main > .page-hero .hero-box, main .section .editorial-kicker, main .section .editorial-section-head, main .section .editorial-card, main .section .editorial-steps li, main .section .card, main .section .value-card, main .section .person, main .section .project-card, main .section .gallery-item, main .section .process-step, main .section .form-card, main .section .contact-item, main .section .stats, main .section .quote-box, main .section .grid-2 > *, main .section .grid-3 > *, main .section .grid-4 > *, main .section .value-grid > *, main .section .team-grid > *, main .section .project-grid > *, main .section .gallery-grid > *, main .section .process > *'
  );
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.body.classList.add('motion-ready');
    revealTargets.forEach((target) => {
      target.setAttribute('data-reveal', '');
      revealObserver.observe(target);
    });
  }

  const flowIllustration = document.querySelector('.flow-illustration');
  const supportsTilt = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
  const tiltCards = document.querySelectorAll(
    'main .card, main .value-card, main .person, main .project-card, main .gallery-item, main .process-step'
  );
  const tiltSurfaces = document.querySelectorAll('main > .page-hero .hero-box, main .form-card, main .contact-item');

  tiltCards.forEach((card) => card.classList.add('is-3d-card'));
  tiltSurfaces.forEach((surface) => surface.classList.add('is-3d-surface'));

  if (supportsTilt) {
    tiltCards.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
        const verticalPosition = (event.clientY - bounds.top) / bounds.height;

        card.style.setProperty('--card-tilt-x', `${(0.5 - verticalPosition) * 5}deg`);
        card.style.setProperty('--card-tilt-y', `${(horizontalPosition - 0.5) * 7}deg`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--card-tilt-x');
        card.style.removeProperty('--card-tilt-y');
      });
    });

    tiltSurfaces.forEach((surface) => {
      surface.addEventListener('pointermove', (event) => {
        const bounds = surface.getBoundingClientRect();
        const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
        const verticalPosition = (event.clientY - bounds.top) / bounds.height;

        surface.style.setProperty('--surface-tilt-x', `${(0.5 - verticalPosition) * 3}deg`);
        surface.style.setProperty('--surface-tilt-y', `${(horizontalPosition - 0.5) * 4}deg`);
      });

      surface.addEventListener('pointerleave', () => {
        surface.style.removeProperty('--surface-tilt-x');
        surface.style.removeProperty('--surface-tilt-y');
      });
    });
  }

  if (flowIllustration && supportsTilt) {
    flowIllustration.addEventListener('pointermove', (event) => {
      const bounds = flowIllustration.getBoundingClientRect();
      const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
      const verticalPosition = (event.clientY - bounds.top) / bounds.height;

      flowIllustration.style.setProperty('--tilt-x', `${(0.5 - verticalPosition) * 7}deg`);
      flowIllustration.style.setProperty('--tilt-y', `${(horizontalPosition - 0.5) * 9}deg`);
      flowIllustration.style.setProperty('--glow-x', `${horizontalPosition * 100}%`);
      flowIllustration.style.setProperty('--glow-y', `${verticalPosition * 100}%`);
      flowIllustration.classList.add('is-pointer-tilting');
    });

    flowIllustration.addEventListener('pointerleave', () => {
      flowIllustration.style.removeProperty('--tilt-x');
      flowIllustration.style.removeProperty('--tilt-y');
      flowIllustration.style.removeProperty('--glow-x');
      flowIllustration.style.removeProperty('--glow-y');
      flowIllustration.classList.remove('is-pointer-tilting');
    });
  }
});
