class AuthModal {
  constructor(madalId) {
    this.modal = document.getElementById(madalId);

    this.modalBlockStyle = this.modal.querySelector(".auth__block");
    this.closeModalBtn = this.modal.querySelector(".auth__close-icon");
    this._setEventListeners();
  }
  _setEventListeners() {
    this.closeModalBtn.addEventListener("click", this.closeModal.bind(this));
  }
  openModal() {
    this.modal.classList.add("visible");
  }
  closeModal() {
    this.modal.classList.remove("visible");
    // resetErr();
  }
}

export default AuthModal;