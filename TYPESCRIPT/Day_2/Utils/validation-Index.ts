document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".products") as HTMLElement;
  const welcomeMessage = document.getElementById("welcomemessage") as HTMLElement;
  const logoutButton = document.getElementById("logoutbutton") as HTMLElement;

  // Define interfaces for Product and User
  interface ProductCategory {
    name: string;
  }

  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: ProductCategory;
  }

  interface User {
    email: string;
  }

  let allProducts: Product[] = []; // Array to store all products

  // Check for user in localStorage
  const user = localStorage.getItem("users");
  if (user) {
    const parsedUser: User[] = JSON.parse(user);

    // Get user details from local storage
    welcomeMessage.innerHTML = `Hello ${parsedUser[0]?.email}`;
    logoutButton.classList.remove("hidden");
  } else {
    welcomeMessage.innerHTML = `Hello, Please <a href="Day_2\\Pages\\login.html">Log In</a>`;
  }

  // Add event listener for logout
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "./Pages/login.html";
  });

  // Function to fetch and populate categories
  function populateCategories(): void {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json()) // Parse JSON from the response
      .then((products: Product[]) => {
        // Extract unique categories as strings
        const categories: string[] = [];
        products.forEach((product) => {
          const category = product.category.name;
          if (categories.indexOf(category) === -1) {
            categories.push(category);
          }
        });

        // Get the select element
        const select = document.getElementById("categories") as HTMLSelectElement;

        // Populate the select element with categories
        categories.forEach((category: string) => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          select.appendChild(option);
        });

        // Add event listener for category change
        select.addEventListener("change", function () {
          const selectedCategory = this.value;
          filterProductsByCategory(selectedCategory, products);
        });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  populateCategories();

  // Function to filter products by category
  function filterProductsByCategory(selectedCategory: string | null, products: Product[]): void {
    productsContainer.innerHTML = "";

    const filteredProducts = selectedCategory
      ? products.filter((product) => product.category.name === selectedCategory)
      : products;

    // Render filtered products
    filteredProducts.forEach((product) => {
      const description = product.description;
      const productTitle = product.title;

      productsContainer.innerHTML += `
        <div class="product">
            <img src="${product.images[1]}" alt="${product.category.name}" class="product-img">
            <div class="product-content">
                <h2 class="product-title">${
                  productTitle.length > 15
                    ? productTitle.substring(0, 15) + "..."
                    : productTitle
                }</h2>
                <h4 class="product-category">${product.category.name}</h4>
                <p class="product-description">${
                  description.length > 80
                    ? description.substring(0, 80) + "...more"
                    : description
                }</p>
                <div class="product-price-container">
                    <h3 class="product-price">$${product.price}</h3>
                    <a href="#!" data-productId="${product.id}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                </div>
            </div>
        </div>
      `;
    });
  }

  // Fetch and display all products
  function fetchProducts(url: string): Promise<void> {
    return fetch(url)
      .then((response) => response.json())
      .then((products: Product[]) => {
        allProducts = products;
        filterProductsByCategory(null, allProducts);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fetchProducts("https://api.escuelajs.co/api/v1/products");
});
