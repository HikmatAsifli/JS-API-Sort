document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.getElementById("product-container");
  const sortTitleAZBtn = document.getElementById("sortTitleAZ");
  const sortTitleZABtn = document.getElementById("sortTitleZA");
  const sortPriceAscBtn = document.getElementById("sortPriceAsc");
  const sortPriceDescBtn = document.getElementById("sortPriceDesc");

  let productData = [];

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      productData = data;
      displayProducts(productData);

      sortTitleAZBtn.addEventListener("click", () => {
        displayProducts(sortProducts(productData, "title", "asc"));
      });

      sortTitleZABtn.addEventListener("click", () => {
        displayProducts(sortProducts(productData, "title", "desc"));
      });

      sortPriceAscBtn.addEventListener("click", () => {
        displayProducts(sortProducts(productData, "price", "asc"));
      });

      sortPriceDescBtn.addEventListener("click", () => {
        displayProducts(sortProducts(productData, "price", "desc"));
      });
    })
    .catch((err) => {
      console.error("Error:", err);
    });

  function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = product.image;

      const title = document.createElement("h3");
      title.textContent = product.title;

      const price = document.createElement("h4");
      price.textContent = "$" + product.price;

      const description = document.createElement("p");
      description.textContent = product.description;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);
      card.appendChild(description);

      productContainer.appendChild(card);
    });
  }

  function sortProducts(products, sortBy, sortOrder) {
    return products.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  }
});
