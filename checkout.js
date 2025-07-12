// frontend/checkout.js

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const summaryDiv = document.getElementById("order-summary");
const totalElement = document.getElementById("order-total");
let total = 0;

if (cart.length === 0) {
  summaryDiv.innerHTML = "<p>Your cart is empty.</p>";
} else {
  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
    `;
    summaryDiv.appendChild(div);
    total += item.price * item.quantity;
  });

  totalElement.innerText = `Total: ₹${total}`;
}

document.getElementById("checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const order = {
    items: cart,
    total,
    shipping: {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      pincode: document.getElementById("pincode").value,
    }
  };

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const result = await res.json();
    alert("✅ Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("❌ Error placing order");
  }
});
