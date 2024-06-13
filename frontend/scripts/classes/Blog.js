class Blog {
  constructor({ card, templateSelector }) {
    this._templateSelector = templateSelector;

    this.card = card;
    this._image = card.image;
    this._title = card.title;
    this._subtitle = card.subtitle;
    this._id = card.id;

    this._cardEl = document
      .querySelector(this._templateSelector)
      .content.querySelector(".blog-template__card")
      .cloneNode(true);

    this._imgCard = this._cardEl.querySelector(".blog-template__img");
    this._titleCard = this._cardEl.querySelector(".blog-template__title");
    this._subtitleCard = this._cardEl.querySelector(".blog-template__subtitle");
    this._cardContent = this._cardEl.querySelector(".blog-template__content");

    this._titleCard.textContent = this._title;
    this._subtitleCard.textContent = this._subtitle;
    this._imgCard.src = this._image;

    this.setEventListeners();
  }
  setEventListeners() {
    this._cardContent.addEventListener("click", () => {
      if (this._id === "2") {
        window.location.assign("blogBahil.html");
      } if (this._id === "3") {
        window.location.assign("blogNapkin.html");
      }
      if (this._id === "1") {
        window.location.assign("blogSoap.html");
      }
    }); ///blogNapkin
  }
  //   removeCard() {
  //     if (this._cardEl.parentNode) {
  //       this._cardEl.parentNode.removeChild(this._cardEl);
  //     }
  //   }
  getCard() {
    return this._cardEl;
  }
}

export default Blog;
