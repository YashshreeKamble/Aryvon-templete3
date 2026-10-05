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
    '.editorial-intro-main, .editorial-side-note, .editorial-section-head, .editorial-card, .editorial-method-heading, .editorial-steps li, .editorial-cta-inner'
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
