const cartItems = [
    { id: 1, name: "Item 1", price: 10.00, quantity: 1 },
    { id: 2, name: "Item 2", price: 15.00, quantity: 1 },
    { id: 3, name: "Item 3", price: 20.00, quantity: 1 }
];

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = "cart-item";
        listItem.innerHTML = `
            <div>
                <span>${item.name}</span>
                <span> - $${item.price.toFixed(2)}</span>
                <span> - Quantity: </span>
                <div class="quantity-controls">
                    <button onclick="adjustQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="adjustQuantity(${item.id}, 1)">+</button>
                </div>
                <span class="heart" onclick="toggleLike(${item.id})">❤️</span>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `;
        cartItemsContainer.appendChild(listItem);
    });

    updateTotalPrice();
}

function adjustQuantity(itemId, change) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 0) item.quantity = 0;
        renderCart();
    }
}

function deleteItem(itemId) {
    const index = cartItems.findIndex(i => i.id === itemId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        renderCart();
    }
}

function toggleLike(itemId) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        const heart = document.querySelector(`.heart:nth-of-type(${itemId})`);
        heart.classList.toggle('liked');
    }
}

function updateTotalPrice() {
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById("total-price").innerText = totalPrice.toFixed(2);
}

// Initial render
renderCart();
