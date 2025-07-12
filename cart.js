// frontend/cart.js

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-container");
const totalElement = document.getElementById("total");

if (cart.length === 0) {
  container.innerHTML = "<p>Your cart is empty 🛒</p>";
} else {
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Qty: ${item.quantity}</p>
      <button onclick="removeFromCart('${item._id}')">Remove</button>
    `;
    total += item.price * item.quantity;
    container.appendChild(div);
  });

  totalElement.innerText = `Total: ₹${total}`;
}

function removeFromCart(id) {
  const updatedCart = cart.filter(item => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  location.reload(); // Refresh page
}
