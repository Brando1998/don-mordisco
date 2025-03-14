let cart = [];

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(name) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.name}</strong> x${item.quantity} - $${item.price * item.quantity}
            <button onclick="removeFromCart('${item.name}')">❌</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.innerText = total;
    cartCount.innerText = cart.length;
}

function toggleCart() {
    let modal = document.getElementById("cart-modal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function sendOrder() {
    let notes = document.getElementById("cart-notes").value;
    let message = "📋 *Pedido:*%0A";

    cart.forEach(item => {
        message += `🛍️ ${item.name} x${item.quantity} - $${item.price * item.quantity}%0A`;
    });

    message += `%0A📝 *Notas:* ${notes}`;
    let whatsappUrl = `https://wa.me/317283817?text=${message}`;
    window.open(whatsappUrl, "_blank");
}
