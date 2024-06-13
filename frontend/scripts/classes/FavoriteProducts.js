class FavoriteProducts {
  constructor({ card, templateSelector, cartCollbackDelBtn }) {
    this._templateSelector = templateSelector;

    this.card = card;
    this._image = card.images[0];
    this._name = card.name;
    this._price = card.price;
    this.idCard = card._id;

    this._cardEl = document
      .querySelector(this._templateSelector)
      .content.querySelector(".template-order__item")
      .cloneNode(true);

    this._imgCard = this._cardEl.querySelector(".template-order__img");
    this._nameCard = this._cardEl.querySelector(".template-order__name");
    this._priceCard = this._cardEl.querySelector(".template-order__price ");

    this._nameCard.textContent = this._name;
    this._priceCard.textContent = this._price;
    this._imgCard.src = this._image;

    this._cartBtn = this._cardEl.querySelector(".card-catalog__icon-cart");
    this._delBtn = this._cardEl.querySelector(".template-order__del-btn");

    this.setEventListeners(cartCollbackDelBtn);
  }
  setEventListeners(cartCollbackDelBtn) {
    this._delBtn.addEventListener("click", () =>
      cartCollbackDelBtn(this.idCard)
    );
  }
  removeCard() {
    if (this._cardEl.parentNode) {
      this._cardEl.parentNode.removeChild(this._cardEl);
    }
  }
  getCard() {
    return this._cardEl;
  }
}

export default FavoriteProducts;
