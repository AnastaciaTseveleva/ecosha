/** SWIPER */

//самый верхний с рекламой
const textSwiper = new Swiper(".swiper-text", {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  speed: 800,
  direction: "vertical",
});

//второй в мэин
const swiper = new Swiper(".image-slider", {
  speed: 700,

  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },
  autoplay: {
    delay: 4000,
  },
});

//третий в новинках
const swiperNews = new Swiper(".news-slider", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  slidesPerView: 1,
});

const cardSwiper = new Swiper(".card-image__swiper-two", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
const cardSwiper2 = new Swiper(".card-image__swiper", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: cardSwiper,
  },
  loop: true,
});

