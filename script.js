
  document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");

    // Fetch products from backend
    fetch("https://kartbn.onrender.com/api/products")
      .then(res => res.json())
      .then(products => {
        if (!products.length) {
          productList.innerHTML = "<p>No products found.</p>";
          return;
        }

        productList.innerHTML = ""; // Clear old content

        products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <a href="product.html?id=${product._id}">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
          </a>
          <p>₹${product.price}</p>
          <button onclick="addToCart('${product._id}', '${product.image}','${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(card);
      });
    })
      .catch(err => {
        console.error("Error loading products:", err);
        productList.innerHTML = "<p>Error loading products.</p>";
      });

    // Show Admin Link if User is Admin
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      document.querySelector("nav").innerHTML += `<a href="admin.html">Admin</a>`;
    }
  });

  // Add to Cart function with image saved
  function addToCart(id, image, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, image, name, price, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  }

