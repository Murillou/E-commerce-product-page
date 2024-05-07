const menuMobile = document.querySelector('.mobile-menu');
const backgroundOverlay = document.querySelector('.overlay');
const quantityItemElement = document.querySelector('.quantityItem');
const imageProduct = document.querySelector('.image-product');
const overlayExpanded = document.querySelector('.overlay-expanded');
const closeButton = document.querySelector('.close-overlay-expanded');
const leftArrow = document.querySelector('.left-arrow-expanded');
const rightArrow = document.querySelector('.right-arrow-expanded');
const imageThumbChecked = document.querySelectorAll(
  'input[type="radio"][name="image-expanded"]'
);

const imageThumbMainChecked = document.querySelectorAll(
  'input[type="radio"][name="image"]'
);

const divItem = document.createElement('div');
const img = document.createElement('img');
const itemName = document.createElement('p');
const itemPrice = document.createElement('p');
const buttonCheckout = document.createElement('button');
const totalCartElement = document.createElement('span');
const imgThrash = document.createElement('img');

let currentImageIndex = 0;
let cartIsOpen = false;
let total = 0;
let itemsCart = [];
imageThumbChecked[currentImageIndex].checked = true;
imageThumbMainChecked[currentImageIndex].checked = true;

const imagesUrl = [
  'images/image-product-1.jpg',
  'images/image-product-2.jpg',
  'images/image-product-3.jpg',
  'images/image-product-4.jpg',
];

function openMenu() {
  if (!menuMobile.classList.contains('open')) {
    menuMobile.classList.add('open');
    backgroundOverlay.classList.add('open');
    menuMobile.classList.remove('closeAnimation');
  }
}

function closeMenu() {
  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.add('closeAnimation');
    backgroundOverlay.classList.remove('open');
  }
  setTimeout(() => {
    menuMobile.classList.remove('open');
  }, 450);
}

function showCart() {
  let cartContent = document.querySelector('.cartContent');
  let existingCart = document.querySelector('.cart');
  if (!cartIsOpen) {
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    h3.textContent = 'Cart';
    h3.classList.add('title-cart');
    div.classList.add('cart', 'cart-open-animation');
    divItem.classList.add('div-item');
    divItem.classList.add('div-item-reajuste');
    div.appendChild(divItem);
    div.appendChild(h3);
    cartContent.appendChild(div);
    if (total > 0) {
      addToCart();
    } else {
      divItem.textContent = 'Your cart is empty.';
    }
    cartIsOpen = true;
  } else {
    existingCart.classList.add('cart-close-animation');
    setTimeout(() => {
      existingCart.remove();
    }, 450);
    cartIsOpen = false;
  }
}

function minusItem() {
  quantityItemElement.textContent = `${
    parseFloat(quantityItemElement.textContent) - 1
  }`;
  if (quantityItemElement.textContent < 0) {
    quantityItemElement.textContent = 0;
  }
}
function maxItem() {
  quantityItemElement.textContent = `${
    parseFloat(quantityItemElement.textContent) + 1
  }`;
}
function addToCart() {
  let item = parseFloat(quantityItemElement.textContent);
  let totalCart = item * 125;
  if (totalCart == 0 || totalCart == '') {
    divItem.classList.add('div-item-reajuste');
    total = 0;
    pop();
    divItem.textContent = 'Your cart is empty';
  } else {
    divItem.classList.remove('div-item-reajuste');
    img.classList.add('image-cart');
    buttonCheckout.classList.add('button-checkout');
    imgThrash.src = 'images/icon-delete.svg';
    imgThrash.classList.add('image-trash');
    buttonCheckout.textContent = 'Checkout';
    totalCartElement.textContent = `$${totalCart}.00`;
    totalCartElement.classList.add('total-price');
    itemPrice.textContent = `$125.00 x ${quantityItemElement.textContent}  `;
    img.src = 'images/image-product-1-thumbnail.jpg';
    itemPrice.classList.add('item-price');
    divItem.textContent = '';
    itemName.textContent = 'Fall Limited Edition Sneakers';
    itemName.classList.add('item-name');
    total = totalCart;
    itemsCart.push(totalCart);
    itemPrice.appendChild(totalCartElement);
    itemPrice.appendChild(imgThrash);
    divItem.appendChild(img);
    divItem.appendChild(itemName);
    divItem.appendChild(itemPrice);
    divItem.appendChild(buttonCheckout);

    pop();
  }
}

imgThrash.addEventListener('click', function () {
  divItem.textContent = 'Your cart is empty';
  divItem.classList.add('div-item-reajuste');

  quantityItemElement.textContent = '0';

  pop();
});

function pop() {
  let item = parseFloat(quantityItemElement.textContent);
  let popup = document.querySelector('.popup');
  popup.classList.add('pop-up');

  if (item < 0 || isNaN(item)) {
    popup.textContent = 0;
  } else {
    popup.textContent = item;
  }
}

pop();

imageThumbChecked.forEach(input => {
  input.addEventListener('change', function () {
    document.querySelector('.image-expanded').src = input.dataset.src;
  });
});

imageProduct.addEventListener('click', () => {
  overlayExpanded.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
  overlayExpanded.style.display = 'none';
});

overlayExpanded.addEventListener('click', event => {
  if (
    !event.target.closest('.image-expanded') &
    !event.target.closest('.image-thumb-expanded') &
    !event.target.closest('.left-arrow-expanded') &
    !event.target.closest('.right-arrow-expanded')
  ) {
    overlayExpanded.style.display = 'none';
  }
});

function imageExpandedUpdate() {
  document.querySelector('.image-expanded').src = imagesUrl[currentImageIndex];
}

leftArrow.addEventListener('click', () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
  } else {
    currentImageIndex = imagesUrl.length - 1;
  }

  imageThumbChecked[currentImageIndex].checked = true;
  imageExpandedUpdate();
});

rightArrow.addEventListener('click', () => {
  if (currentImageIndex < imagesUrl.length - 1) {
    currentImageIndex++;
  } else {
    currentImageIndex = 0;
  }

  imageThumbChecked[currentImageIndex].checked = true;
  imageExpandedUpdate();
});

imageThumbMainChecked.forEach(element => {
  element.addEventListener('change', () => {
    imageProduct.src = element.dataset.src;
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth < 930) {
    overlayExpanded.style.display = 'none';
  }
});
