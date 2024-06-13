import {
  getProduct,
  getUserCart,
  addProductCart,
  addProductFavorite,
  getUserFavorite,
  removeProductFavorite,
} from "../scripts/utils/api.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const cartBtn = document.querySelector(".card-info__add-cart");
const likeBtn = document.querySelector(".card-info__icon");
const userId = localStorage.getItem("userId");

const priceProduct = document.querySelector(".card-info__price");
const infoProduct = document.querySelector(".card-info__subtitle");
const nameProduct = document.querySelector(".card-info__title");
const firstImage = document.querySelectorAll(".first");
const secondImage = document.querySelectorAll(".second");
const thirdImage = document.querySelectorAll(".third");
const fourImage = document.querySelectorAll(".four");

function checkFavoriteProduct() {
  getUserFavorite(userId).then((value) => {
    value.forEach((item) => {
      if (item === productId) {
        likeBtn.classList.add("card-info__icon-active");
      }
    });
  });
}

likeBtn.addEventListener("click", () => {
  if (likeBtn.classList.contains("card-info__icon-active")) {
    removeProductFavorite(userId, productId).then((value) => {
      likeBtn.classList.remove("card-info__icon-active");
    });
  } else {
    addProductFavorite(userId, productId).then((value) => {
      checkFavoriteProduct();
    });
  }
});

cartBtn.addEventListener("click", () => {
  getUserCart(userId).then((value) => {
    if (value.includes(productId)) {
      cartBtn.textContent = "в корзине";
      cartBtn.classList.add("card-info__add-cart-active");
      cartBtn.addEventListener("click", () => {
        window.location.assign("shoppingCart.html");
      });
    } else {
      addProductCart(userId, productId).then(() => {
        checkShoppingCart();
      });
    }
  });
});

function checkShoppingCart() {
  getUserCart(userId).then((value) => {
    value.forEach((item) => {
      if (item === productId) {
        cartBtn.textContent = "в корзине";
        cartBtn.classList.add("card-info__add-cart-active");
        cartBtn.addEventListener("click", () => {
          window.location.assign("shoppingCart.html");
        });
      }
    });
  });
}

getProduct(productId).then((value) => {
  console.log(value);
  priceProduct.textContent = value.price;
  infoProduct.textContent = value.description;
  nameProduct.textContent = value.name;
  firstImage.forEach((img) => {
    img.src = value.images[0];
  });
  secondImage.forEach((img) => {
    img.src = value.images[1];
  });
  thirdImage.forEach((img) => {
    img.src = value.images[2];
  });
  fourImage.forEach((img) => {
    img.src = value.images[3];
  });
});

checkShoppingCart();
checkFavoriteProduct();
