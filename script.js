const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation.",
    image: "https://via.placeholder.com/300x200?text=Headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-packed smart watch with health tracking.",
    image: "https://via.placeholder.com/300x200?text=Smart+Watch"
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    description: "Ergonomic laptop stand for better posture.",
    image: "https://via.placeholder.com/300x200?text=Laptop+Stand"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    description: "Portable Bluetooth speaker with great sound quality.",
    image: "https://via.placeholder.com/300x200?text=Speaker"
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: 59.99,
    description: "Precision gaming mouse with customizable buttons.",
    image: "https://via.placeholder.com/300x200?text=Gaming+Mouse"
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 39.99,
    description: "Multi-port USB-C hub for all your connectivity needs.",
    image: "https://via.placeholder.com/300x200?text=USB-C+Hub"
  }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price}</p>
        <p class="product-description">${product.description}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
  saveCart();
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function displayCart() {
  const cartSection = document.getElementById('cart-section');
  const cartItems = document.getElementById('cart-items');
  if (cart.length === 0) {
    cartSection.style.display = 'none';
    return;
  }
  cartSection.style.display = 'block';
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
      <span>${item.name} - $${item.price} x ${item.quantity}</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join('');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
  displayCart();
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Checkout functionality would be implemented here!');
});

displayProducts();
updateCart();
displayCart();