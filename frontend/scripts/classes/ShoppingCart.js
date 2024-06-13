class ShoppingCart {
  constructor(containerSelector) {
    this._cartEl = document.querySelector(containerSelector);
    this._totalCost = document.querySelector(".order__total_result");
    this.cart = [];
    this.sum = 0;
  }

  addCartItem(cartItem) {
    const findedCartItem = this.cart.find((item) => item.id == cartItem.id);

    if (findedCartItem) {
      throw new Error("такой элемент уже существует");
    } else {
      this.cart.push(cartItem);
    }
  }
  renderCart() {
    this._cartEl.innerHTML = "";
    this.cart.forEach((item) => {
      this._cartEl.append(item.getNode());
    });
  }
  removeCartItem(cartItemId) {
    this.cart = this.cart.filter((item) => item.id !== cartItemId);
  }
  getCost() {
    return this.cart.reduce((cost, item) => {
      return cost + item.count * item.price;
    }, 0);
  }
  setCost() {
    this._totalCost.textContent = this.getCost()
  }
  getCard() {
    return this._cardEl;
  }
}

export default ShoppingCart;

////Карточка товара
