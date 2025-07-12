document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  

 
  // Temporary hardcoded products (later we'll load from backend)
  

  // Render products into grid
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart('${product.id}', '${product.name}', ${product.price})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
});

// Add product to cart (stored in localStorage)
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}


const user = JSON.parse(localStorage.getItem("user"));
if (user && user.role === "admin") {
  document.querySelector("nav").innerHTML += `<a href="admin.html">Admin</a>`;
}



const productList = document.getElementById("product-list");

fetch("http://localhost:5000/api/products")
  .then(res => res.json())
  .then(products => {
    if (!products.length) {
      productList.innerHTML = "<p>No products found.</p>";
      return;
    }

    productList.innerHTML = ""; // clear previous
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error loading products:", err);
    productList.innerHTML = "<p>Error loading products.</p>";
  });


 
