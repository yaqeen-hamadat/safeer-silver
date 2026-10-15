(() => {
  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const setMenu = open => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.nav-wrap')) setMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) setMenu(false);
    }, { passive: true });
  }

  const backTop = document.querySelector('.back-top');
  if (backTop) {
    const updateBackTop = () => backTop.classList.toggle('visible', window.scrollY > 500);
    updateBackTop();
    window.addEventListener('scroll', updateBackTop, { passive: true });
  }

  const items = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('in-view'));
  }
})();
