const productTitle = document.getElementById("productTitle");
const productDescription = document.getElementById("productDescription");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const addProductBtn = document.getElementById("addProductBtn");
const updateProductBtn = document.getElementById("updateProductBtn");
const productCards = document.getElementById("productCards");

let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

const renderProducts = () => {
    productCards.innerHTML = "";
    products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <p><strong>Product-title:${product.title}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <button class="btn Add-to-cart-btn" onclick="Add to cart(${index})">Add to cart</button>
        `;
        productCards.appendChild(card);
    });
};

const addProduct = () => {
    if (!productTitle.value || !productDescription.value || !productCategory.value || !productPrice.value) {
        alert("Please fill out all fields!");
        return;
    }
    const newProduct = {
        title: productTitle.value,
        description: productDescription.value,
        category: productCategory.value,
        price: parseFloat(productPrice.value),
    };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    clearForm();
};

const editProduct = (index) => {
    const product = products[index];
    productTitle.value = product.title;
    productDescription.value = product.description;
    productCategory.value = product.category;
    productPrice.value = product.price;
    editIndex = index;
    addProductBtn.style.display = "none";
    updateProductBtn.style.display = "inline-block";
};

const updateProduct = () => {
    if (!productTitle.value || !productDescription.value || !productCategory.value || !productPrice.value) {
        alert("Please fill out all fields!");
        return;
    }
    products[editIndex] = {
        title: productTitle.value,
        description: productDescription.value,
        category: productCategory.value,
        price: parseFloat(productPrice.value),
    };
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    clearForm();
    addProductBtn.style.display = "inline-block";
    updateProductBtn.style.display = "none";
    editIndex = null;
};

const deleteProduct = (index) => {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
};

const clearForm = () => {
    productTitle.value = "";
    productDescription.value = "";
    productCategory.value = "";
    productPrice.value = "";
};

addProductBtn.addEventListener("click", addProduct);
updateProductBtn.addEventListener("click", updateProduct);

renderProducts();