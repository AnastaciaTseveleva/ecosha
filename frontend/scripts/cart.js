import ShoppingCart from "./classes/ShoppingCart.js";
import ShoppingCartItem from "./classes/ShoppingCartItem.js";
import { getUserCart } from "../scripts/utils/api.js";
import { getProduct, removeProductCart } from "../scripts/utils/api.js";

// let sum = 0;

// const totalSum = document.querySelector(".order__total_result");
// const priceProduct = document.querySelectorAll(".template-order__price");

// priceProduct.forEach((price) => {
//   sum += +price.textContent;
//   console.log(sum);
//   totalSum.textContent = sum;
// });

const userId = localStorage.getItem("userId");

const config = {
  templateCardEl: ".template-order",
  cardContainer: ".template-order__container",
  totalSum: ".order__total_result",
};
const cardContainer = document.querySelector(config.cardContainer);

const cart = new ShoppingCart(".template-order__container");

getUserCart(userId).then((value) => {
  if (value.length === 0) {
    document.querySelector(".empty-cart").style.display = "block";
    document.querySelector(".full-cart").style.display = "none";
  } else {
    document.querySelector(".empty-cart").style.display = "none";
    document.querySelector(".full-cart").style.display = "block";
  }

  //value-все id карточек из корзины
  value.forEach((item) => {
    const isAuth = localStorage.getItem("isAuth") === "true" ? true : false;
    getProduct(item).then((info) => {
      const cartItem = new ShoppingCartItem({
        templateSelector: ".template-order",
        img: info.images[0],
        header: info.name,
        price: info.price,
        addCollback: () => {
          cartItem.setCount(cartItem.count + 1);
          cartItem.updateCost();
          cart.setCost();
        },
        reduceCollback: () => {
          if (cartItem.count > 1) {
            cartItem.setCount(cartItem.count - 1);
            cart.setCost();
            cartItem.updateCost();
          }
        },
        delCollback: () => {
          if (isAuth) {
            removeProductCart(userId, info._id).then((value) => {
              console.log(value);

              getUserCart(userId).then((updatedValue) => {
                if (updatedValue.length === 0) {
                  document.querySelector(".empty-cart").style.display = "block";
                  document.querySelector(".full-cart").style.display = "none";
                }
              });
            });
          }
          cart.removeCartItem(info._id);
          cart.renderCart();
        },
        id: info._id,
      });
      cart.addCartItem(cartItem);
      cart.renderCart();
      cart.setCost();
      console.log(cart.getCost());
    });
  });
});
