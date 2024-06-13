import Card from "./classes/Card.js";
import {
  getCatalog,
  getUserCart,
  addProductCart,
  addProductFavorite,
  getUserFavorite,
  removeProductCart,
  removeProductFavorite,
  getCatalogCategories,
  getProductsInCategory,
  getProductsInSubcategory,
} from "./utils/api.js";

const urlParams = new URLSearchParams(window.location.search);
const productSubcategory = urlParams.get("subcategory");
const productCategory = urlParams.get("category");

const config = {
  templateCardEl: ".main-catalog__container",
  cardContainer: ".card__container",
};

const cardContainer = document.querySelector(config.cardContainer);

if (!productCategory && !productSubcategory) {
  fetchData({});
}
if (productSubcategory) {
  fetchData({ subcategory: productSubcategory });
}
if (productCategory) {
  fetchData({ category: productCategory });
}

async function fetchData({ category, subcategory }) {
  console.log(category, subcategory);
  const products = category
    ? await getProductsInCategory(category)
    : subcategory
    ? await getProductsInSubcategory(subcategory)
    : await getCatalog();

  products.forEach(async (item) => {
    const isAuth = localStorage.getItem("isAuth") === "true";
    const userId = localStorage.getItem("userId");

    let userCart = [];
    let isBuyed = false;
    let userFav = [];
    let isFav = false;

    if (isAuth) {
      userCart = await getUserCart(userId);
      isBuyed = userCart.includes(item._id);
      userFav = await getUserFavorite(userId);
      isFav = userFav.includes(item._id);
    }

    const card = new Card({
      card: item,
      templateSelector: config.templateCardEl,
      userId: userId,
      isBuyed,
      isFav,
      cartCollbackInActiveCartBtn: () =>
        handleCartBtnClick(isAuth, userId, item._id, true),
      cartCollbackOnActiveCartBtn: () =>
        handleCartBtnClick(isAuth, userId, item._id, false),
      cartCollbackInActiveFavBtn: () =>
        handleFavBtnClick(isAuth, userId, item._id, true),
      cartCollbackOnActiveFavBtn: () =>
        handleFavBtnClick(isAuth, userId, item._id, false),
    });

    cardContainer.appendChild(card.getCard());
  });
}

function handleCartBtnClick(isAuth, userId, productId, isAdd) {
  if (isAuth) {
    if (isAdd) {
      addProductCart(userId, productId).then((value) => console.log(value));
    } else {
      removeProductCart(userId, productId).then((value) => console.log(value));
    }
  }
}

function handleFavBtnClick(isAuth, userId, productId, isAdd) {
  if (isAuth) {
    if (isAdd) {
      addProductFavorite(userId, productId).then((value) => console.log(value));
    } else {
      removeProductFavorite(userId, productId).then((value) =>
        console.log(value)
      );
    }
  }
}

// if (!productCategory) {
//   getAllCatalog();
// } else {
//   getByCategory(productCategory);
// }

// function getByCategory(productCategory) {
//   getProductsInSubcategory(productCategory).then((value) =>
//     value.forEach(async (item) => {
//       const isAuth = localStorage.getItem("isAuth") === "true" ? true : false;
//       const userId = localStorage.getItem("userId");

//       let userCart = [];
//       let isBuyed = false;
//       let userFav = [];
//       let isFav = false;

//       if (isAuth) {
//         userCart = await getUserCart(userId);
//         isBuyed = userCart.includes(item._id);
//         userFav = await getUserFavorite(userId);
//         isFav = userFav.includes(item._id);
//       }
//       const card = new Card({
//         card: item,

//         templateSelector: config.templateCardEl,
//         userId: localStorage.getItem("userId"), /////
//         isBuyed,
//         isFav,
//         cartCollbackInActiveCartBtn: () => {
//           //не окрашена
//           if (isAuth) {
//             addProductCart(userId, item._id).then((value) =>
//               console.log(value)
//             );
//           }
//         },
//         cartCollbackOnActiveCartBtn: () => {
//           //окрашена
//           if (isAuth) {
//             removeProductCart(userId, item._id).then((value) =>
//               console.log(value)
//             );
//           }
//         },
//         cartCollbackInActiveFavBtn: () => {
//           //не окрашена
//           if (isAuth) {
//             addProductFavorite(userId, item._id).then((value) =>
//               console.log(value)
//             );
//           }
//         },
//         cartCollbackOnActiveFavBtn: () => {
//           //окрашена
//           if (isAuth) {
//             removeProductFavorite(userId, item._id).then((value) =>
//               console.log(value)
//             );
//           }
//         },
//       });
//       cardContainer.appendChild(card.getCard());
//     })
//   );
// }

// function getAllCatalog() {
//   getCatalog().then((value) =>
//     value.forEach(async (item) => {
//       const isAuth = localStorage.getItem("isAuth") === "true" ? true : false;
//       const userId = localStorage.getItem("userId");

//       let userCart = [];
//       let isBuyed = false;
//       let userFav = [];
//       let isFav = false;

//       if (isAuth) {
//         userCart = await getUserCart(userId);
//         isBuyed = userCart.includes(item._id);
//         userFav = await getUserFavorite(userId);
//         isFav = userFav.includes(item._id);
//       }
//       const card = new Card({
//         card: item,

//         templateSelector: config.templateCardEl,
//         userId: localStorage.getItem("userId"), /////
//         isBuyed,
//         isFav,
//         cartCollbackInActiveCartBtn: () => {
//           //не окрашена
//           if (isAuth) {
//             addProductCart(userId, item._id).then((value) =>
//               console.log(value)
//             );
//           }
//         },
//         cartCollbackOnActiveCartBtn: () => {
//           //окрашена
//           if (isAuth) {
//             removeProductCart(userId, item._id).then((value) =>
//               console.log(value)
//             );
//           }
//         },
//         cartCollbackInActiveFavBtn: () => {
//           //не окрашена
//           if (isAuth) {
//             addProductFavorite(userId, item._id).then((value) =>
//               console.log(value)
//             );
//           }
//         },
//         cartCollbackOnActiveFavBtn: () => {
//           //окрашена
//           if (isAuth) {
//             removeProductFavorite(userId, item._id).then((value) =>
//               console.log(value)
//             );
//           }
//         },
//       });
//       cardContainer.appendChild(card.getCard());
//     })
//   );
// }

// getCatalogCategories().then((value) => {
//   console.log(value);
// });

getProductsInCategory(productCategory).then((products) => {
  console.log(products);
});
