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
  

const burgerButton = document.querySelector('.burger-button');
const headerMenu = document.querySelector('.header__menu');

function onButtonClick (event) {
  burgerButton.classList.toggle('is-active');
  headerMenu.classList.toggle('is-active');
  document.documentElement.classList.toggle('is-lock');
}

burgerButton.addEventListener('click', onButtonClick);

const slides = Array.from(document.querySelectorAll('.slider__item'));
const sliderTrack = document.querySelector('.slider__track');
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.previous-btn');
const indicators = Array.from(document.querySelectorAll('.slider__indicators-elem'));

let currentIndex = 0;

function updateSlider() {
  const currentWidth = slides[0].getBoundingClientRect().width;

  sliderTrack.style.transform = `translateX(-${currentIndex * currentWidth}px)`;

  indicators.forEach(indicator => indicator.classList.remove('active'));
  indicators[currentIndex].classList.add('active')
}

window.addEventListener('resize', updateSlider);

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length; // После последнего перейдет на 0
  updateSlider();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // После 0 перейдет на последний
  updateSlider();
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});

// menu links click -> auto closing burger-menu

const menuLinks = Array.from(document.querySelectorAll('.header__menu-item'));

function closeMenuOnMenuLinkClick() {
  burgerButton.classList.remove('is-active');
  headerMenu.classList.remove('is-active');
  document.documentElement.classList.remove('is-lock');
}

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenuOnMenuLinkClick);
});

// создание карточек из джэйсона

let productsData = [];

async function loadProducts() {
  try {
    const response = await fetch('../products.json');
    productsData = await response.json();
    renderCards(productsData); // Запускаем отрисовку карточек
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

loadProducts();

function renderCards(products) {
  const grid = document.querySelector('.menu__body');
  grid.innerHTML = '';

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.classList.add('menu__card', 'card');
    card.setAttribute('product-id', index);
    card.setAttribute('card-category', card.category);

    card.innerHTML = `<div class="card__image"><img src="" alt=""></div>
            <div class="card__content">
              <h3 class="card__title">${card.name}</h3>
              <p class="card__text">${card.description}</p>
              <p class="card__price">$${card.price}</p>
            </div>`;

    card.addEventListener('click', openModal(index));
    grid.appendChild(card);
  });
}

renderCards(productsData);