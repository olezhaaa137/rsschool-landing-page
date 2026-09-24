const checkbox = document.getElementById('header__darkmode-toggle');
checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', checkbox.checked);

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark-mode');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

if (localStorage.getItem('theme') === 'dark-mode') {
  document.body.classList.add('dark-mode');
  checkbox.checked = true;
}
  