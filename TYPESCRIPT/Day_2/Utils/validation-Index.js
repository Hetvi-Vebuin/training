// document.addEventListener("DOMContentLoaded", () => {
//   const productsContainer = document.querySelector(".products") as HTMLElement;
//   const welcomeMessage = document.getElementById(
//     "welcomemessage"
//   ) as HTMLElement;
//   const logoutButton = document.getElementById("logoutbutton") as HTMLElement;
//   let allProducts: any[] = []; // Array to store all products
//   // Check for user in localStorage
//   const user = localStorage.getItem("users");
//   if (user) {
//     const parsedUser: { email: string }[] = JSON.parse(user);
//     // Get user details from local storage
//     welcomeMessage.innerHTML = `Hello ${parsedUser[0]?.email}`;
//     logoutButton.classList.remove("hidden");
//   } else {
//     welcomeMessage.innerHTML = `Hello, Please <a href="Day_2\\Pages\\login.html">Log In</a>`;
//   }
//   // Add event listener for logout
//   logoutButton.addEventListener("click", () => {
//     localStorage.removeItem("user");
//     window.location.href = "./Pages/login.html";
//   });
//   // Function to fetch and populate categories
//   function populateCategories(): void {
//     fetch("https://api.escuelajs.co/api/v1/products")
//       .then((response) => response.json()) // Parse JSON from the response
//       .then((products: { category: { name: string } }[]) => {
//         // Extract unique categories as strings
//         const categories: string[] = [];
//         products.forEach((product) => {
//           const category = product.category.name;
//           if (categories.indexOf(category) === -1) {
//             categories.push(category);
//           }
//         });
//         // Get the select element
//         const select = document.getElementById(
//           "categories"
//         ) as HTMLSelectElement;
//         // Populate the select element with categories
//         categories.forEach((category: string) => {
//           const option = document.createElement("option");
//           option.value = category;
//           option.textContent = category;
//           select.appendChild(option);
//         });
//         // Add event listener for category change
//         select.addEventListener("change", function () {
//           const selectedCategory = this.value;
//           filterProductsByCategory(selectedCategory, products);
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }
//   populateCategories();
//   // Function to filter products by category
//   function filterProductsByCategory(
//     selectedCategory: string | null,
//     products: any[]
//   ): void {
//     productsContainer.innerHTML = "";
//     const filteredProducts = selectedCategory
//       ? products.filter((product) => product.category.name === selectedCategory)
//       : products;
//     // Render filtered products
//     filteredProducts.forEach((product) => {
//       const description = product.description as string;
//       const productTitle = product.title as string;
//       productsContainer.innerHTML += `
//                   <div class="product">
//                       <img src="${product.images[1]}" alt="${product.category.name}" class="product-img">
//                       <div class="product-content">
//                           <h2 class="product-title">${
//                             productTitle.length > 15
//                               ? productTitle.substring(0, 15) + "..."
//                               : productTitle
//                           }</h2>
//                           <h4 class="product-category">${
//                             product.category.name
//                           }</h4>
//                           <p class="product-description">${
//                             description.length > 80
//                               ? description.substring(0, 80) + "...more"
//                               : description
//                           }</p>
//                           <div class="product-price-container">
//                               <h3 class="product-price">$${product.price}</h3>
//                               <a href="#!" data-productId="${
//                                 product.id
//                               }" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
//                           </div>
//                       </div>
//                   </div>
//               `;
//     });
//   }
//   // Fetch and display all products
//   function fetchProducts(url: string): Promise<void> {
//     return fetch(url)
//       .then((response) => response.json())
//       .then((products) => {
//         allProducts = products;
//         filterProductsByCategory(null, allProducts);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
//   fetchProducts("https://api.escuelajs.co/api/v1/products");
// });
document.addEventListener("DOMContentLoaded", function () {
    var _a;
    var productsContainer = document.querySelector(".products");
    var welcomeMessage = document.getElementById("welcomemessage");
    var logoutButton = document.getElementById("logoutbutton");
    var allProducts = []; // Array to store all products
    // Check for user in localStorage
    var user = localStorage.getItem("users");
    if (user) {
        var parsedUser = JSON.parse(user);
        // Get user details from local storage
        welcomeMessage.innerHTML = "Hello ".concat((_a = parsedUser[0]) === null || _a === void 0 ? void 0 : _a.email);
        logoutButton.classList.remove("hidden");
    }
    else {
        welcomeMessage.innerHTML = "Hello, Please <a href=\"Day_2\\Pages\\login.html\">Log In</a>";
    }
    // Add event listener for logout
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("user");
        window.location.href = "./Pages/login.html";
    });
    // Function to fetch and populate categories
    function populateCategories() {
        fetch("https://api.escuelajs.co/api/v1/products")
            .then(function (response) { return response.json(); }) // Parse JSON from the response
            .then(function (products) {
            // Extract unique categories as strings
            var categories = [];
            products.forEach(function (product) {
                var category = product.category.name;
                if (categories.indexOf(category) === -1) {
                    categories.push(category);
                }
            });
            // Get the select element
            var select = document.getElementById("categories");
            // Populate the select element with categories
            categories.forEach(function (category) {
                var option = document.createElement("option");
                option.value = category;
                option.textContent = category;
                select.appendChild(option);
            });
            // Add event listener for category change
            select.addEventListener("change", function () {
                var selectedCategory = this.value;
                filterProductsByCategory(selectedCategory, products);
            });
        })
            .catch(function (error) {
            console.error("Error fetching categories:", error);
        });
    }
    populateCategories();
    // Function to filter products by category
    function filterProductsByCategory(selectedCategory, products) {
        productsContainer.innerHTML = "";
        var filteredProducts = selectedCategory
            ? products.filter(function (product) { return product.category.name === selectedCategory; })
            : products;
        // Render filtered products
        filteredProducts.forEach(function (product) {
            var description = product.description;
            var productTitle = product.title;
            productsContainer.innerHTML += "\n        <div class=\"product\">\n            <img src=\"".concat(product.images[1], "\" alt=\"").concat(product.category.name, "\" class=\"product-img\">\n            <div class=\"product-content\">\n                <h2 class=\"product-title\">").concat(productTitle.length > 15
                ? productTitle.substring(0, 15) + "..."
                : productTitle, "</h2>\n                <h4 class=\"product-category\">").concat(product.category.name, "</h4>\n                <p class=\"product-description\">").concat(description.length > 80
                ? description.substring(0, 80) + "...more"
                : description, "</p>\n                <div class=\"product-price-container\">\n                    <h3 class=\"product-price\">$").concat(product.price, "</h3>\n                    <a href=\"#!\" data-productId=\"").concat(product.id, "\" class=\"add-to-cart\"><ion-icon name=\"cart-outline\"></ion-icon></a>\n                </div>\n            </div>\n        </div>\n      ");
        });
    }
    // Fetch and display all products
    function fetchProducts(url) {
        return fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (products) {
            allProducts = products;
            filterProductsByCategory(null, allProducts);
        })
            .catch(function (err) {
            console.error(err);
        });
    }
    fetchProducts("https://api.escuelajs.co/api/v1/products");
});
