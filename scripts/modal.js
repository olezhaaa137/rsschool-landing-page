const cardBody = document.querySelector('.menu__body');
const cardModal = document.querySelector('.card-modal');
const modalContent = document.querySelector('.card-modal__content');
const closeButton = document.querySelector('.card-modal__close');
console.log(closeButton);
console.log(cardBody);

//get all products
let productsData = [];
async function loadProducts() {
  try {
    const response = await fetch('../products.json');
    productsData = await response.json();
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

loadProducts();
// function that open modal

function openModal(event) {
  const card = event.target.closest('.card');

  console.log(card);
  if (!card) return;
  const imageSource = card.querySelector('img').src;
  const product = productsData.find(
    (product) =>
      product.name === card.querySelector('.card__title').textContent,
  );

  // calculating total price

  //

  console.log(product);
  modalContent.innerHTML = `<div class="card-modal__img"><img src="${imageSource}" alt="image" /></div>
            <div class="card-modal__body">
              <h3 class="card-modal__header">${product.name}</h3>
              <p class="card-modal__text">${product.description}</p>
              <div class="card-modal__size-buttons">
                <button class="size-button" data-addPrice="${product.sizes.s["add-price"]}">${product.sizes.s["size"]}</button>
                <button class="size-button" data-addPrice="${product.sizes.m["add-price"]}">${product.sizes.m["size"]}</button>
                <button class="size-button" data-addPrice="${product.sizes.l["add-price"]}">${product.sizes.l["size"]}</button>
              </div>
              <div class="card-modal__additives">
                <button class="additive-button" data-addprice="${product.additives[0]["add-price"]}">${product.additives[0]["name"]}</button>
                <button class="additive-button" data-addprice="${product.additives[1]["add-price"]}">${product.additives[1]["name"]}</button>
                <button class="additive-button" data-addprice="${product.additives[2]["add-price"]}">${product.additives[2]["name"]}</button>
              </div>
              <div class="card-modal__total-sum">Total: <span>$${product.price}</span></div>
              <hr />
              <p class="card-modal__warning">
                The cost is not final. Download our mobile app to see the final
                price and place your order. Earn loyalty points and enjoy your
                favorite coffee with up to 20% discount.
              </p>
              <button class="card-modal__close">Close</button>
            </div>`;

  document.documentElement.classList.add('is-lock');
  cardModal.classList.remove('hidden');
}

// Слушаем клик на всем модальном окне
cardModal.addEventListener('click', function(event) {
  // Если кликнули на кнопку закрытия (или её содержимое)
  if (event.target.closest('.card-modal__close')) {
    document.documentElement.classList.remove('is-lock');
    cardModal.classList.add('hidden');
  }
});


// closeButton.addEventListener('click', closeModal);
cardBody.addEventListener('click', openModal);
