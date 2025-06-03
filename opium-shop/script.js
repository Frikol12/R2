const products = [
  { name: 'Urban Hoodie', price: 59, type: 'hoodies', img: 'https://via.placeholder.com/200x200?text=Hoodie' },
  { name: 'White Sneakers', price: 89, type: 'sneakers', img: 'https://via.placeholder.com/200x200?text=Sneakers' },
  { name: 'Winter Jacket', price: 129, type: 'jackets', img: 'https://via.placeholder.com/200x200?text=Jacket' },
  { name: 'Logo T-Shirt', price: 29, type: 'tshirts', img: 'https://via.placeholder.com/200x200?text=T-Shirt' },
  { name: 'Black Hat', price: 19, type: 'hats', img: 'https://via.placeholder.com/200x200?text=Hat' }
];

const productList = document.getElementById('productList');
const cartItems = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');
let cart = [];

function renderProducts(filter = 'all') {
  productList.innerHTML = '';
  products
    .filter(p => filter === 'all' || p.type === filter)
    .forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>€${product.price}</p>
        <button class="addToCart" onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
      `;
      productList.appendChild(div);
    });
}

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - €${item.price} <button onclick="removeFromCart(${index})">❌</button>`;
    cartItems.appendChild(li);
  });
  totalPriceEl.textContent = `Total: €${total}`;
}

function filterItems(type) {
  renderProducts(type);
}

document.getElementById('catalogToggle').onclick = () => {
  document.getElementById('catalog').classList.toggle('show');
};

document.getElementById('cartToggle').onclick = () => {
  document.getElementById('cart').classList.toggle('show');
};

document.getElementById('registerBtn').onclick = () => {
  document.getElementById('registerModal').style.display = 'block';
};

function closeModal() {
  document.getElementById('registerModal').style.display = 'none';
}

function registerEmail() {
  const email = document.getElementById('email').value;
  if (email) {
    alert(`Registered with email: ${email}`);
    closeModal();
  }
}

function toggleMobileMenu() {
  document.getElementById('main-nav').classList.toggle('show');
}

// CHAT LOGIC

const chatModal = document.getElementById('chatModal');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatToggleBtn = document.getElementById('chatToggle');

chatToggleBtn.onclick = () => {
  chatModal.style.display = 'block';
};

document.getElementById('closeChat').onclick = () => {
  chatModal.style.display = 'none';
};

function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    appendMessage('user', message);
    chatInput.value = '';
    setTimeout(() => {
      const reply = getSupportReply(message);
      appendMessage('support', reply);
    }, 800);
  }
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = `msg ${sender}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getSupportReply(userMessage) {
  const responses = [
    'Здравствуйте! Чем можем помочь?',
    'Пожалуйста, уточните ваш вопрос.',
    'Спасибо за сообщение! Мы с вами свяжемся.',
    'Мы проверим и напишем вам!'
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Init
renderProducts();
