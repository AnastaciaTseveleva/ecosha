class Card {
  constructor({
    card,
    templateSelector,
    cartCollbackOnActiveCartBtn,
    cartCollbackInActiveCartBtn,
    userId,
    cartCollbackOnActiveFavBtn,
    cartCollbackInActiveFavBtn,
    isFav,
    isBuyed,
  }) {
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._id = card._id; //id товара
    this.card = card;
    this._image = card.images[0];
    this._hoverImages = [];
    this._name = card.name;
    this._price = card.price;
    this.isBuyed = isBuyed;
    this.isFav = isFav;

    card.images.forEach((img, idx) => {
      if (idx != 0) {
        this._hoverImages.push(img);
      }
    });

    this._cardEl = document
      .querySelector(this._templateSelector)
      .content.querySelector(".main-catalog__card")
      .cloneNode(true);

    this._imgCard = this._cardEl.querySelector(".card-catalog__img");
    this._hoverImgCard = this._cardEl.querySelector(".card-catalog__hover-img");
    this._nameCard = this._cardEl.querySelector(".card-catalog__name");
    this._priceCard = this._cardEl.querySelector(".card-catalog__price");
    this._imageContainer = this._cardEl.querySelector(".card-catalog__images");

    this._nameCard.textContent = this._name;
    this._priceCard.textContent = this._price;
    this._imgCard.src = this._image;
    this._hoverImgCard.src = this._hoverImages[1];

    this._cartBtn = this._cardEl.querySelector(".card-catalog__icon-cart");
    this._likeBtn = this._cardEl.querySelector(".card-catalog__icon-like");

    if (this.isBuyed) {
      this._cartBtn.classList.add("card-catalog__icon-cart_active");
    }

    if (isFav) {
      this._likeBtn.classList.add("card-catalog__icon-like_active");
    }

    this.setEventListeners(
      cartCollbackInActiveCartBtn,
      cartCollbackOnActiveCartBtn,
      cartCollbackInActiveFavBtn,
      cartCollbackOnActiveFavBtn
    );
  }
  setEventListeners(
    cartCollbackInActiveCartBtn,
    cartCollbackOnActiveCartBtn,
    cartCollbackInActiveFavBtn,
    cartCollbackOnActiveFavBtn
  ) {
    this._cartBtn.addEventListener("click", () => {
      if (this.isBuyed) {
        this.togglCartActiveBtn();
        cartCollbackOnActiveCartBtn();
      } else {
        this.togglCartActiveBtn();
        cartCollbackInActiveCartBtn();
      }
    });
    ////nize
    this._likeBtn.addEventListener("click", () => {
      if (this.isFav) {
        this.togglCartActiveLikeBtn();
        cartCollbackOnActiveFavBtn();
      } else {
        this.togglCartActiveLikeBtn();
        cartCollbackInActiveFavBtn();
      }
    });
    this._imageContainer.addEventListener(
      "click",
      this._openProductCard.bind(this)
    );
  }
  togglCartActiveBtn() {
    if (this.isBuyed) {
      this._cartBtn.classList.remove("card-catalog__icon-cart_active");
      this.isBuyed = false;
    } else {
      this._cartBtn.classList.add("card-catalog__icon-cart_active");
      this.isBuyed = true;
    }
  }
  togglCartActiveLikeBtn() {
    if (this.isFav) {
      this._likeBtn.classList.remove("card-catalog__icon-like_active");
      this.isFav = false;
    } else {
      this._likeBtn.classList.add("card-catalog__icon-like_active");
      this.isFav = true;
    }
  }
  _openProductCard() {
    window.location.assign(`сardProduct.html?id=${this._id}`);
  }

  getCard() {
    return this._cardEl;
  }
}

export default Card;
