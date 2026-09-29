// создание карточек из джэйсона

let productsData = [];
let activeCategory = 'coffee';


async function loadProducts() {
  try {
    const response = await fetch('../products.json');
    productsData = await response.json();
    renderCardsByActiveCategory(productsData); // Запускаем отрисовку карточек
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

loadProducts();

function renderCardsByActiveCategory(products) {
  const grid = document.querySelector('.menu__body');
  grid.innerHTML = '';
  const filteredProducts = products.filter(product => product.category === activeCategory);
  filteredProducts.forEach((product, index) => {
    const card = document.createElement('div');
    card.classList.add('menu__card', 'card');
    card.setAttribute('product-id', index);
    card.setAttribute('card-category', product.category);

    card.innerHTML = `<div class="card__image"><img src="./images/menu/${activeCategory}-${index + 1}.png" alt=""></div>
            <div class="card__content">
              <h3 class="card__title">${product.name}</h3>
              <p class="card__text">${product.description}</p>
              <p class="card__price">$${product.price}</p>
            </div>`;

    //card.addEventListener('click', openModal(index));
    grid.appendChild(card);
  });
}

renderCardsByActiveCategory(productsData);

// add eventlistener to category buttons

const buttons = Array.from(document.querySelectorAll('.menu__categorie-btn'));

function changeCategory(event) {
  buttons.forEach(button => button.classList.remove('active'));
  const button = event.target.closest('.menu__categorie-btn');
  if (!button) return;
  button.classList.add('active');
  activeCategory = event.target.dataset.category;
  renderCardsByActiveCategory(productsData);
}

buttons.forEach(button => button.addEventListener('click', changeCategory));