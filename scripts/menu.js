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
    card.setAttribute('card-category', product.category);

    card.innerHTML = `<div class="card__image"><img src="" alt=""></div>
            <div class="card__content">
              <h3 class="card__title">${product.name}</h3>
              <p class="card__text">${product.description}</p>
              <p class="card__price">$${product.price}</p>
            </div>`;

    //card.addEventListener('click', openModal(index));
    grid.appendChild(card);
  });
}

renderCards(productsData);