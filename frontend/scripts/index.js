import { registration, authorization } from "./utils/api.js";

import AuthModal from "./classes/AuthModal.js";

//меняем изображение в выпадающем меню
let links = document.querySelectorAll(".dropdown__content-link");
let imageContainer = document.querySelector(".dropdown__content-img");
links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    let imgSrc = link.getAttribute("data-src-image");
    imageContainer.src = imgSrc;
  });
});

/** авторизыция регистрация  */
///открытие-закрытие модальных окон

const registrationPopup = new AuthModal("registration");
const loginPopup = new AuthModal("authorize");
const accountPopup = new AuthModal("account");

const tabButtons = document.querySelectorAll(".tabBtn"); //кнопки-ссылки на модальные окна

const exitAccountBtn = document.querySelector(".accaunt-exit");
const nameAccountLabel = document.querySelector(".account-name");

const isHaveAuthName = localStorage.getItem("username");

console.log(isHaveAuthName);

if (isHaveAuthName) {
  nameAccountLabel.textContent = isHaveAuthName;
}

exitAccountBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
  localStorage.removeItem("isAuth");
  window.location.reload();
});

function closePopups(popups) {
  popups.forEach((p) => {
    p.closeModal();
    resetError();
  });
}

function handleClick(e) {
  closePopups([registrationPopup, loginPopup, accountPopup]);
  const dataPopup = e.target.dataset.popup;

  switch (dataPopup) {
    case "registration":
      registrationPopup.openModal();
      break;
    case "authorize":
      loginPopup.openModal();
      break;
    default:
      break;
  }
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

/**Открытие модального окна */
const authEl = document.querySelector(".secondary-links__icon-face");

authEl.addEventListener("click", () => {
  const isAuth = localStorage.getItem("isAuth") === "true" ? true : false;

  if (isAuth) {
    console.log("isAuth", isAuth);
    accountPopup.openModal();
    return;
  }
  loginPopup.openModal();
});

/**BACKEND*/
const registrationForm = document.querySelector(".registration-form");
const registerInputName = document.querySelector(".registration-input-name");
const registerInputPassw = document.querySelector(".registration-input-passw");
// const registrationBtn = document.querySelector(".registration-btn");
const authorizationForm = document.querySelector(".authorize-form");
const authorizeInputName = document.querySelector(".authorize-input-name");
const authorizeInputPassw = document.querySelector(".authorize-input-passw");

const errNameReg = document.querySelector(".err-message-name");
const errPasswReg = document.querySelector(".err-message-passw");
const errNameAuth = document.querySelector(".err-message-nameLogin");
const errPasswAuth = document.querySelector(".err-message-passwLogin");

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // if (!registerInputName.value.trim() || !registerInputPassw.value.trim()) {
  //   alert("вы не заполнили обязательные поля");
  //   return;
  // }

  //проверка на незаполненные поля
  let hasError = false;

  if (!registerInputName.value.trim()) {
    showErr(registerInputName, "Вы не заполнили обязательное поле", errNameReg);
    hasError = true;
  }
  if (!registerInputPassw.value.trim()) {
    showErr(
      registerInputPassw,
      "Вы не заполнили обязательное поле",
      errPasswReg
    );
    hasError = true;
  }
  if (
    registerInputName.value.length > 0 &&
    registerInputName.value.length < 4
  ) {
    showErr(registerInputName, "Слишком короткое имя пользователя", errNameReg);
    hasError = true;
  }
  if (
    registerInputPassw.value.length > 0 &&
    registerInputPassw.value.length < 4
  ) {
    showErr(registerInputPassw, "Слишком короткий пароль", errPasswReg);
    hasError = true;
  }
  if (hasError) {
    return;
  }
  ////проверка закончилась//////

  registration(registerInputName.value, registerInputPassw.value)
    .then((data) => {
      console.log(data);
      alert("Вы успешно зарегистрировались");
      window.location.reload();
    })
    .catch((error) => alert(error));
});

authorizationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //проверка на незаполненные поля
  let hasError = false;

  if (!authorizeInputName.value.trim()) {
    showErr(
      authorizeInputName,
      "Вы не заполнили обязательное поле",
      errNameAuth
    );
    hasError = true;
  }
  if (!authorizeInputPassw.value.trim()) {
    showErr(
      authorizeInputPassw,
      "Вы не заполнили обязательное поле",
      errPasswAuth
    );
    hasError = true;
  }

  if (hasError) {
    return;
  }
  ////проверка закончилась//////

  authorization(authorizeInputName.value, authorizeInputPassw.value)
    .then((data) => {
      console.log(data);
      if (data.error) {
        alert("Вы ввели неверный логин и/или пароль");
        return;
      }
      nameAccountLabel.textContent = authorizeInputName.value;
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", authorizeInputName.value);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("userId", data.id);
      closePopups([registrationPopup, loginPopup, accountPopup]);
      alert("Вы успешно вошли");
      window.location.reload();
    })
    .catch((error) => console.log(error));
});

function showErr(filed, errText, err) {
  const existingErr = filed.parentElement.nextElementSibling;
  if (existingErr && existingErr.textContent === errText) {
    return;
  }
  err.classList.add("err-message-active");
  filed.classList.add("field-err");
  err.textContent = errText;
  filed.parentElement.after(err);
  hideErr(filed, err);
}

function hideErr(filed, err) {
  filed.addEventListener("input", () => {
    filed.classList.remove("field-err");
    err.classList.remove("err-message-active");
  });
}

const allForm = document.querySelectorAll(".auth-form__form");

function resetError() {
  allForm.forEach((form) => {
    const errorInput = form.querySelectorAll(".auth-form__input");
    errorInput.forEach((errorInput) => {
      errorInput.classList.remove("field-err");
      errorInput.value = "";
    });
    const errorMessages = form.querySelectorAll(".err-message");
    errorMessages.forEach((errorMessage) => {
      errorMessage.classList.remove("err-message-active");
    });
  });
}

let allLink = document.querySelectorAll(".dropdown__subcategory");
let allLinks = document.querySelectorAll(".dropdown__category");
allLink.forEach((link) => {
  link.addEventListener("click", (event) => {
    let subcategory = event.target.getAttribute("id");
    window.location.assign(`catalog.html?subcategory=${subcategory}`);
  });
});

allLinks.forEach((link)=>{
  console.log(link)
  link.addEventListener("click", (event) => {
    let category = event.target.getAttribute("id");
    window.location.assign(`catalog.html?category=${category}`);
  });
})