 const productsData = [
  {
    id: 1,
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg"
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.50
  },
  {
    id: 2,
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg"
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.00
  },
  {
    id: 3,
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg"
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.00
  },
  {
    id: 4,
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg"
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.50
  },
  {
    id: 5,
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg"
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.00
  },
  {
    id: 6,
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg"
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.00
  },
  {
    id: 7,
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg"
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.50
  },
  {
    id: 8,
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg"
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.50
  },
  {
    id: 9,
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg"
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.50
  }
];

let cart = [];

const productGrid = document.getElementById("product-grid");
const emptyCartView = document.getElementById("empty-cart");
const activeCartView = document.getElementById("active-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalPriceEl = document.getElementById("cart-total-price");
const confirmOrderBtn = document.getElementById("confirm-order-btn");
const modalOverlay = document.getElementById("modal-overlay");
const summaryItemsContainer = document.getElementById("summary-items");
const summaryTotalPriceEl = document.getElementById("summary-total-price");
const newOrderBtn = document.getElementById("new-order-btn");

function init() {
  renderProducts();
  renderCart();
}

function renderProducts() {
  productGrid.innerHTML = productsData.map(product => {
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const isSelected = quantity > 0;

    return `
      <div class="product-card">
        <div class="product-img-wrapper ${isSelected ? 'selected' : ''}">
          <img src="${product.image.desktop}" alt="${product.name}" class="product-img">
          ${
            isSelected
              ? `<div class="quantity-btn-group">
                  <button class="qty-control" onclick="updateQuantity(${product.id}, -1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="currentColor" d="M0 .375h10v1.25H0z"/></svg>
                  </button>
                  <span>${quantity}</span>
                  <button class="qty-control" onclick="updateQuantity(${product.id}, 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                  </button>
                 </div>`
              : `<button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                  <img src="./assets/images/icon-add-to-cart.svg" alt=""> Add to Cart
                 </button>`
          }
        </div>
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </div>
    `;
  }).join('');
}

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  cart.push({ ...product, quantity: 1 });
  updateUI();
}

function updateQuantity(productId, change) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  }
  updateUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateUI();
}

function updateUI() {
  renderProducts();
  renderCart();
}

function renderCart() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCountEl.textContent = totalCount;

  if (cart.length === 0) {
    emptyCartView.classList.remove("hidden");
    activeCartView.classList.add("hidden");
  } else {
    emptyCartView.classList.add("hidden");
    activeCartView.classList.remove("hidden");

    cartItemsContainer.innerHTML = cart.map(item => `
      <li class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-meta">
            <span class="cart-item-qty">${item.quantity}x</span>
            <span class="cart-item-unit">@ $${item.price.toFixed(2)}</span>
            <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
        </button>
      </li>
    `).join('');

    cartTotalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

confirmOrderBtn.addEventListener("click", () => {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  summaryItemsContainer.innerHTML = cart.map(item => `
    <li class="summary-item">
      <div class="summary-item-left">
        <img src="${item.image.thumbnail}" alt="${item.name}" class="summary-thumbnail">
        <div>
          <h4>${item.name}</h4>
          <div class="summary-item-meta">
            <span class="cart-item-qty">${item.quantity}x</span>
            <span class="cart-item-unit">@ $${item.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <span class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
    </li>
  `).join('');

  summaryTotalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
  modalOverlay.classList.remove("hidden");
});

newOrderBtn.addEventListener("click", () => {
  cart = [];
  modalOverlay.classList.add("hidden");
  updateUI();
});

init();