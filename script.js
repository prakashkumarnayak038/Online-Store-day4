
let buttons = document.querySelectorAll(".category-buttons button");

if (buttons.length > 0) {
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    let cartElement = document.getElementById("cart-count");
    if (cartElement) {
        cartElement.innerText = cart.length;
    }
}


function addToCart(name, price, image) {
    let product = {
        name: name,
        price: parseInt(price.replace("₹", "")),
        image: image
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {

  
    updateCartCount();

  
    let name = localStorage.getItem("productName");
    let price = localStorage.getItem("productPrice");

    let nameEl = document.getElementById("product-name");
    let priceEl = document.getElementById("product-price");

    if (nameEl && priceEl) {
        nameEl.innerText = name || "No Product Found";
        priceEl.innerText = price || "";
    }


    loadCart();
});


let searchInput = document.getElementById("search");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        let value = searchInput.value.toLowerCase();
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let text = card.innerText.toLowerCase();
            if (text.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}


let categoryButtons = document.querySelectorAll(".category-buttons button");
let cards = document.querySelectorAll(".card");

if (categoryButtons.length > 0) {
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            let category = button.innerText.toLowerCase();

            cards.forEach(card => {
                if (category === "all" || card.dataset.category === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}


function viewProduct(name, price) {
    localStorage.setItem("productName", name);
    localStorage.setItem("productPrice", price);
    window.location.href = "product.html";
}


function loadCart() {
    let cartItemsDiv = document.getElementById("cart-items");
    let totalPriceEl = document.getElementById("total-price");

    if (!cartItemsDiv || !totalPriceEl) return;

    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

       cartItemsDiv.innerHTML += `
            <div style="margin:10px 0; display:flex; align-items:center; gap:10px;">
                <img src="${item.image}" width="60">
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalPriceEl.innerText = "Total: ₹" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
    updateCartCount();
}
