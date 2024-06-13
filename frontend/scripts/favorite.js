import FavoriteProducts from "./classes/FavoriteProducts.js";
import { getUserFavorite } from "../scripts/utils/api.js";
import { getProduct, removeProductFavorite } from "../scripts/utils/api.js";
const userId = localStorage.getItem("userId");
// getProduct()

// const nameProduct = document.querySelector(".template-order__name");
// const imgProduct = document.querySelector(".template-order__img");
// const priceProduct = document.querySelector(".template-order__price");

const data = [
  {
    image: "./assets/img/new-item/flower-soap.png",
    name: "мыло ручной работы",
    price: "250 ",
  },
  {
    image: "./assets/img/new-item/flower-soap.png",
    name: "мыло ручной работы",
    price: "250 ",
  },
  {
    image: "./assets/img/new-item/flower-soap.png",
    name: "мыло ручной работы",
    price: "250 ",
  },
  {
    image: "./assets/img/new-item/flower-soap.png",
    name: "мыло ручной работы",
    price: "250 ",
  },
  {
    image: "./assets/img/new-item/flower-soap.png",
    name: "мыло ручной работы",
    price: "250 ",
  },
];
const config = {
  templateCardEl: ".template-order",
  cardContainer: ".template-order__container",
};
const cardContainer = document.querySelector(config.cardContainer);
// data.forEach((item) => {
//   const card = new FavoriteProducts({
//     card: item,
//     templateSelector: config.templateCardEl,
//   });
//   cardContainer.appendChild(card.getCard());
// });

getUserFavorite(userId).then((value) => {
  //value-все id карточек из корзины
  if (value.length === 0) {
    document.querySelector(".empty-cart").style.display = "block";
    document.querySelector(".full-cart").style.display = "none";
  } else {
    document.querySelector(".empty-cart").style.display = "none";
    document.querySelector(".full-cart").style.display = "block";
  }
  value.forEach((item) => {
    const isAuth = localStorage.getItem("isAuth") === "true" ? true : false;
    getProduct(item).then((info) => {
      ///по id ищем инфу о карточке
      console.log(info);
      const card = new FavoriteProducts({
        card: info,
        templateSelector: config.templateCardEl,
        cartCollbackDelBtn: (idProduct) => {
          if (isAuth) {
            console.log(idProduct);
            removeProductFavorite(userId, idProduct).then((value) => {
              console.log(value);
              card.removeCard();

               getUserFavorite(userId).then((updatedValue) => {
                 if (updatedValue.length === 0) {
                   document.querySelector(".empty-cart").style.display =
                     "block";
                   document.querySelector(".full-cart").style.display = "none";
                 }
               });
            });
          }
        },
      });
      cardContainer.appendChild(card.getCard());
    });
  });
});
