const cards = document.querySelector('.cards');
const pagination__list = document.querySelector('.pagination__list')
const arrowInfo = document.querySelector('.arrow');
const dropDown = document.querySelector('.drop_down');
const cartButton = document.querySelector('.cart-button');
const cartBox = document.querySelector('.cart-box');
const totalNumber = document.querySelector('.total__number');
const shopWindow = document.querySelector('.shop_window');
const closeShopWindow = document.querySelector('.close__icon');
const shopLogo = document.querySelector('.cart-button');

let cartContent = JSON.parse(localStorage.getItem('cart')) || {};

let products = [];
const pageLimit = 24;
let currentPage = 1;
const isActive = ` bg-[#1e1e1e] text-white`;

shopLogo.addEventListener('click', () => {
  if (shopWindow.classList.contains('translate-x-[445px]')) {
    shopWindow.classList.remove('translate-x-[445px]');
  } else {
    shopWindow.classList.add('translate-x-[445px]')
  }
});

closeShopWindow.addEventListener('click', () => {
  shopWindow.classList.add('translate-x-[445px]')
});

renderCartButton();

function renderCartButton() {
  const div = document.createElement('div');
  div.className = `cart-number absolute left-[17px] top-[-15px] flex items-center justify-center bg-black text-white border border-black w-[20px] h-[20px] rounded-full`

  if (Object.keys(cartContent).length > 0) {
    div.innerText = `${Object.keys(cartContent).length}`;
    cartButton.append(div);
  }
};

function changeAmount(prodId, direction) {
  switch (direction) {
    case 'increase':
      cartContent[prodId] += 1;
      break;
    case 'decrease':
      cartContent[prodId] -= 1;

      if (cartContent[prodId] === 0) {
        delete cartContent[prodId];
      }
      break;
    default:
      delete cartContent[prodId];
      break;
  }

  localStorage.setItem('cart', JSON.stringify(cartContent));
  renderCartButton();
  renderCart();
}

function renderCart() {
  const totalSpan = document.createElement('span');
  let total = 0;
  cartBox.innerHTML = '';

  Object.keys(cartContent).forEach(item => {
    const productId = +item
    const cartItem = document.createElement('li');

    const product = products.find(prod => prod.id === productId);
    total += product.variants[0].price * cartContent[productId];

    cartItem.innerHTML = `
  <div class="flex gap-[18px] relative">
    <div class="w-[74px] h-[74px] border rounded border-white"></div>
      <div class="flex flex-col gap-y-[9px]">
        <span class="text-sm">
            ${product.title}
        </span>
        <span class="text-white text-sm">${product.variants[0].price * cartContent[productId]} UAH.</span>
        <div class="flex text-sm">
        <button class="text-white flex text-sm font-bold justify-center items-center  w-[20px] h-[20px]" onclick="changeAmount(${productId}, 'decrease')">-</button>
          <span class="text-white flex text-sm font-bold justify-center items-center  w-[20px] h-[20px]">${cartContent[productId]}</span>
          <button class="text-white flex text-sm font-bold justify-center items-center  w-[20px] h-[20px]" onclick="changeAmount(${productId}, 'increase')">+</button>
        </div>  
        
        <button class="text-white absolute top-0 right-0" onclick="changeAmount(${productId}, 'delete')">
        <img src="assets/delete.svg">
        </button>
      </div>
  </div>
`
    cartBox.append(cartItem)
  });

  totalNumber.innerText = `${total} UAH.`
};

function addToCart(productId) {
  cartContent[productId] = cartContent[productId] ? cartContent[productId] + 1 : 1;
  localStorage.setItem('cart', JSON.stringify(cartContent));

  renderCartButton();
  renderCart();
}

function renderPaginationItem(pageNumber = 0) {
  const li = document.createElement('li');
  li.className = 'pagination__item flex cursor-pointer items-center justify-center hover:text-white hover:bg-[#1e1e1e] w-[39px] h-[39px] border border-black rounded-full ';

  li.className += pageNumber === currentPage ? isActive : '';

  if (pageNumber) {
    li.addEventListener('click', (e) => {

      currentPage = +e.target.innerHTML;
      paginateProducts(currentPage);
      renderPagination();
    });
  } else {
    li.classList.remove('hover:bg-[#1e1e1e]');
    li.classList.remove('hover:text-white');
    li.classList.remove('cursor-pointer');
  }


  li.innerHTML = `${pageNumber ? pageNumber : '...'}`
  pagination__list.append(li);
}
function renderPagination() {
  pagination__list.innerHTML = '';
  const maxCountPages = Math.ceil(products.length / pageLimit);
  let renderNext = true;
  let counter = 1;
  let counterShift = 0;

  if (currentPage > 3) {
    renderPaginationItem(1);
    renderPaginationItem();
    if (currentPage !== maxCountPages) {
      counterShift = currentPage -2;
    } else {
      counterShift = currentPage - 5;
    }
  }

  while (renderNext) {

    renderPaginationItem(counter + counterShift);
    counter++;

    if (counter > (maxCountPages > 5 ? 5 : maxCountPages) || (counterShift && counter > 3 && currentPage !== maxCountPages)) {
      renderNext = false;
      if  (currentPage <= maxCountPages - 4) {
        renderPaginationItem();
        renderPaginationItem(maxCountPages);
      }
    }
  }
}
function paginateProducts(page = 1) {
  renderProducts(products.slice(pageLimit * (page - 1), pageLimit * page));
}
function renderProducts(products) {
  cards.innerHTML = ``;

  products.forEach(prod => {
    const card = document.createElement('div');
    card.className ='card sm:w-300';

    card.innerHTML = `
        <div class="main_content p-3 h-80 w-full border rounded border-black">
          <div class="main__content-mark uppercase font-normal py-1 px-2.5 bg-black text-white inline-block rounded">used</div>
        </div>
        <div class="description flex my-3 justify-between text-black">
          <div class="description__product">
            <p class="product__name text-ellipsis overflow-hidden font-bold">
              ${prod.title}
            </p>
            <p class="product__content font-bold">
              ${prod.variants[0].price} UAH.
            </p>
          </div>
          <div class="description__condition justify-items-end">
            <p class="condition__name font-medium flex justify-end">
              Condition
            </p>
            <p class="condition__content font-normal">
              Slightly used
            </p>
          </div>
        </div>
        <button onclick="addToCart(${prod.id})" class="uppercase cursor-pointer w-full rounded p-4 font-bold text-white bg-black " type="button">
          add to cart
        </button>
    `;
    cards.append(card);
  })
}



document.addEventListener('click', (e) => {
  const isDropdownBlock = e.target.closest('[data-dropdown-button]');
  const dropdownWindow = e.target.closest('[data-dropdown-window]');

  if (dropdownWindow) {
    return;
  }

  if (isDropdownBlock) {
    dropDown.classList.toggle('opacity-0');
    arrowInfo.classList.toggle('rotate-180');
  }

  if (!isDropdownBlock) {
    dropDown.classList.add('opacity-0');
    arrowInfo.classList.remove('rotate-180');
  }
});


fetch('https://voodoo-sandbox.myshopify.com/products.json?limit=461')
  .then(response => response.json())
  .then(data => {
    products = data.products;
    paginateProducts(currentPage);
    renderPagination();
    renderCartButton();
    renderCart();
  });



