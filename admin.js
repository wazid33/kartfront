document.getElementById("product-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const images = [
    document.getElementById("image1").value,
    document.getElementById("image2").value,
    document.getElementById("image3").value,
    document.getElementById("image4").value
  ].filter(url => url.trim() !== "");

  const product = {
    name: document.getElementById("name").value,
    price: Number(document.getElementById("price").value),
    image: images[0] || "",
    images: images,
    description: document.getElementById("description").value,
    stock: Number(document.getElementById("stock").value),
    sizes: document.getElementById("sizes").value.split(",").map(s => s.trim()),
    category: document.getElementById("category").value
  };

  try {
    const res = await fetch("https://kartbn.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (res.ok) {
      alert("✅ Product Added Successfully");
      this.reset();
      loadProducts(); // refresh list
    } else {
      const data = await res.json();
      alert("❌ Server Error: " + (data.error || res.status));
    }
  } catch (err) {
    console.error("Connection Error:", err);
    alert("❌ Error connecting to server");
  }
});
