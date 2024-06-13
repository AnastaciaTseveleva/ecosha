class ShoppingCartItem {
  constructor({
    templateSelector,
    img,
    header,
    price,
    addCollback,
    reduceCollback,
    delCollback,
    id,
  }) {
    this.count = 1;
    this._templateSelector = templateSelector;
    this.id = id;
    this.img = img;
    this.header = header;
    this.price = price;

    this.cost = price;

    this._cardEl = document
      .querySelector(this._templateSelector)
      .content.querySelector(".template-order__item")
      .cloneNode(true);

    this._imgCard = this._cardEl.querySelector(".template-order__img");
    this._headerCard = this._cardEl.querySelector(".template-order__name");
    this._priceCard = this._cardEl.querySelector(".template-order__price ");
    this._addBtn = this._cardEl.querySelector(
      ".template-order__counter-btn_add"
    );
    this._reduceBtn = this._cardEl.querySelector(
      ".template-order__counter-btn_reduce"
    );
    this._delBtn = this._cardEl.querySelector(".template-order__del-btn");
    this._countLabel = this._cardEl.querySelector(
      ".template-order__counter-btn_number "
    );

    this._imgCard.src = this.img;
    this._headerCard.textContent = this.header;
    this._priceCard.textContent = this.cost;

    this.setEventListeners(addCollback, reduceCollback, delCollback);
  }
  setEventListeners(addCollback, reduceCollback, delCollback) {
    this._addBtn.addEventListener("click", addCollback);
    this._delBtn.addEventListener("click", delCollback);
    this._reduceBtn.addEventListener("click", reduceCollback);
  }
  setCount(count) {
    this.count = count;
    this._countLabel.textContent = this.count;
  }
  updateCost() {
    this.cost = this.price * this.count;
    this._priceCard.textContent = this.cost;
  }
  getNode() {
    return this._cardEl;
  }
}
export default ShoppingCartItem;
