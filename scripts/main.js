const checkbox = document.getElementById('header__darkmode-toggle');
checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', checkbox.checked);
});
