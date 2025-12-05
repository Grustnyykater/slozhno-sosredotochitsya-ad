(() => {
  // Скрипт переключения тем: добавляет класс на <html>
  const btns = Array.from(document.querySelectorAll('.header__theme-menu-button'));
  const html = document.documentElement;

  function setActive(button) {
    btns.forEach(b => {
      b.classList.remove('header__theme-menu-button_active');
      b.disabled = false;
      b.style.pointerEvents = '';
    });
    if (button) {
      button.classList.add('header__theme-menu-button_active');
      button.disabled = true;
      button.style.pointerEvents = 'none';
    }
  }

  function applyTheme(kind) {
    html.classList.remove('theme-light', 'theme-dark', 'theme-auto');
    if (kind === 'light') html.classList.add('theme-light');
    else if (kind === 'dark') html.classList.add('theme-dark');
    else if (kind === 'auto') html.classList.add('theme-auto');
  }

  // Инициализация: авто по умолчанию
  applyTheme('auto');

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const kind = btn.dataset.theme;
      applyTheme(kind);
      setActive(btn);
    });
  });

  // Если пользователь вернул авто, нужно слушать prefers-color-scheme
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  mq.addEventListener?.('change', () => {
    if (html.classList.contains('theme-auto')) {
      // перестановка классов для демонстрации — переменные в light.css применятся
      if (mq.matches) html.classList.add('theme-light');
      else html.classList.remove('theme-light');
    }
  });
})();
