(function () {
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const systemPrefferedThemeQuery = window.matchMedia(
    '(prefers-color-scheme: dark)'
  );

  systemPrefferedThemeQuery.addListener(($event) => {
    if ($event.matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });

  const isDarkTheme = () =>
    document.documentElement.getAttribute('data-theme') === 'dark';

  const toggleTheme = () => {
    if (isDarkTheme()) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const $toggleButton = document.querySelector('.js-toggle-button');
  $toggleButton.addEventListener('click', toggleTheme);
})();
