// frontend/products.js

fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("product-container");

    if (data.length === 0) {
      container.innerHTML = "<p>No products available.</p>";
      return;
    }

    data.forEach(product => {
      const div = document.createElement("div");
      card.innerHTML = `
          <a href="product.html?id=${product._id}">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          </a>
          <p>₹${product.price}</p>
          <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
           `;

      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Error loading products:", err);
  });

function addToCart(productId) {
  alert("Product added to cart: " + productId);
  // In next step, we will save product in localStorage
}



function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if already in cart
  const exists = cart.find(item => item._id === productId);
  if (exists) {
    exists.quantity += 1;
  } else {
    const product = products.find(p => p._id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart ✅");
}
