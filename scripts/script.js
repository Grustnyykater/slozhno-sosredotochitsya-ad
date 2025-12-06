(() => {
  const html = document.documentElement;
  const buttons = Array.from(document.querySelectorAll('.header__theme-menu-button'));

  function setActiveButton(activeBtn) {
    buttons.forEach(btn => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.disabled = false;
      btn.style.pointerEvents = '';
    });

    if (activeBtn) {
      activeBtn.classList.add('header__theme-menu-button_active');
      activeBtn.disabled = true;
      activeBtn.style.pointerEvents = 'none';
    }
  }

  function applyTheme(kind) {
    html.classList.remove('theme-light', 'theme-dark', 'theme-auto');

    if (kind === 'light') html.classList.add('theme-light');
    else if (kind === 'dark') html.classList.add('theme-dark');
    else if (kind === 'auto') {
      html.classList.add('theme-auto');
      // sync with prefers-color-scheme
      const mq = window.matchMedia('(prefers-color-scheme: light)');
      if (mq.matches) html.classList.add('theme-light');
      else html.classList.remove('theme-light');
    }
  }

  // init: auto
  applyTheme('auto');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const kind = btn.dataset.theme;
      applyTheme(kind);
      setActiveButton(btn);
    });
  });

  // update when system preference changes and html has theme-auto
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  mq.addEventListener?.('change', () => {
    if (html.classList.contains('theme-auto')) {
      if (mq.matches) html.classList.add('theme-light');
      else html.classList.remove('theme-light');
    }
  });
})();
