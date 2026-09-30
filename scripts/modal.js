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
    const response = await fetch('data/products.json');
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
              <div class="card-modal__titles">
                <h3 class="card-modal__header">${product.name}</h3>
                <p class="card-modal__text">${product.description}</p>
              </div>
              <div class="card-modal__size-buttons">
                <p class="card-modal__buttons-title">Size</p>
                <div class="card-modal__buttons-body">
                  <input id="s-size-btn" type="radio" name="size" checked class="size-button card-modal__add-price-button" data-addPrice="${product.sizes.s['add-price']}"></input>
                  <label class="card-modal__add-price-button" for="s-size-btn"><span>S</span> ${product.sizes.s['size']}</label>
                  <input id="m-size-btn" class="size-button card-modal__add-price-button" type="radio" name="size" data-addPrice="${product.sizes.m['add-price']}"></input>
                  <label class="card-modal__add-price-button" for="m-size-btn"><span>M</span> ${product.sizes.m['size']}</label>
                  <input id="l-size-btn" class="size-button card-modal__add-price-button" type="radio" name="size" data-addPrice="${product.sizes.l['add-price']}"></input>
                  <label class="card-modal__add-price-button" for="l-size-btn"><span>L</span> ${product.sizes.l['size']}</label>
                </div>
              </div>
              <div class="card-modal__additives">
                <p class="card-modal__buttons-title">Additives</p>
                <div class="card-modal__buttons-body">
                  <input id="first-checkbox" type="checkbox" class="additive-button card-modal__add-price-button" data-addprice="${product.additives[0]['add-price']}"></input>
                  <label class="card-modal__add-price-button" for="first-checkbox"><span>1</span> ${product.additives[0]['name']}</label>
                  <input id="second-checkbox" type="checkbox" class="additive-button card-modal__add-price-button" data-addprice="${product.additives[1]['add-price']}"></input>
                  <label class="card-modal__add-price-button" for="second-checkbox"><span>2</span> ${product.additives[1]['name']}</label>
                  <input id="third-checkbox" type="checkbox" class="additive-button card-modal__add-price-button" data-addprice="${product.additives[2]['add-price']}"></input>
                  <label for="third-checkbox" class="card-modal__add-price-button"><span>3</span> ${product.additives[2]['name']}</label>
                </div>
              </div>
              <div class="card-modal__total-sum">Total: <div>$<span>${product.price}</span></div></div>
              
              <p class="card-modal__warning">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_147811_7961)">
    <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
  </g>
  <defs>
    <clipPath id="clip0_147811_7961">
      <rect width="16" height="16" fill="white" />
    </clipPath>
  </defs>
</svg>
                The cost is not final. Download our mobile app to see the final
                price and place your order. Earn loyalty points and enjoy your
                favorite coffee with up to 20% discount.
              </p>
              <button class="card-modal__close">Close</button>
            </div>`;

  document.documentElement.classList.add('is-lock');
  cardModal.classList.remove('hidden');

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.documentElement.classList.remove('is-lock');
      cardModal.classList.add('hidden');
    }
  });
}

// Слушаем клик на всем модальном окне
cardModal.addEventListener('click', function (event) {
  // Если кликнули на кнопку закрытия (или её содержимое)
  if (event.target.closest('.card-modal__close')) {
    document.documentElement.classList.remove('is-lock');
    cardModal.classList.add('hidden');
  }
});

// closeButton.addEventListener('click', closeModal);
cardBody.addEventListener('click', openModal);

function calculateSumOnChange() {
  const product = productsData.find(
    (product) =>
      product.name === cardModal.querySelector('.card-modal__header').textContent,
  );
  const currentPriceElem = cardModal.querySelector('.card-modal__total-sum span');
  let currentPrice = Number.parseFloat(
    cardModal.querySelector('.card-modal__total-sum span').textContent,
  );
  if (!currentPrice) return;

  const selectedSize = cardModal.querySelector('.size-button:checked');
  const selectedSizeAddPrice = Number.parseFloat(selectedSize.dataset.addprice);

  let newPrice = 0;

  newPrice = +product.price + selectedSizeAddPrice;

  Array.from(cardModal.querySelectorAll('.additive-button:checked')).forEach(
    (button) => (newPrice += Number.parseFloat(button.dataset.addprice)),
  );

  currentPriceElem.textContent = newPrice.toFixed(2);
}

const radioSizes = Array.from(document.querySelectorAll('.size-button'));
const additivesChckbxs = Array.from(
  document.querySelectorAll('.additive-button'),
);
console.log(radioSizes);
console.log(additivesChckbxs);

//radioSizes.forEach(radio => radio.addEventListener('change', calculateSumOnChange));
//additivesChckbxs.forEach(checkbox => checkbox.addEventListener('change', calculateSumOnChange));
cardModal.addEventListener('change', (event) => {
  if (
    event.target.classList.contains('size-button') ||
    event.target.classList.contains('additive-button')
  ) {
    calculateSumOnChange();
  }
});
