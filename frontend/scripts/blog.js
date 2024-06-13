// import FavoriteProducts from "./classes/FavoriteProducts.js";
import Blog from "./classes/Blog.js";
const data = [
  {
    image: "./assets/img/img-blog/blog-soap.jpeg",
    title: "Твердый шампунь - это мыло за 500 рублей?",
    subtitle:
      "разбираемся, зачем люди берут твердый уход, и почему это не только про экологию ",
    id: "1",
  },
  {
    image: "./assets/img/img-blog/blog-bahil.jpeg",
    title: "Многоразовые бахилы: быстрый экскурс",
    subtitle: "Из чего они сделаны, как стирать и ответы на ваши вопросы",
    id: "2",
  },
  {
    image: "./assets/img/img-blog/blog-napkin.jpeg",
    title: "Восковые салфетки – замена пищевой плёнке, пакетам и фольге",
    subtitle: "Почему восковые салфетки это не только полезно, но и удобно ",
    id: "3",
  },
  //   {
  //     image: "./assets/img/img-blog/blog-soap.jpeg",
  //     title: "Твердый шампунь - это мыло за 500 рублей?",
  //     subtitle:
  //       "разбираемся, зачем люди берут твердый уход, и почему это не только про экологию ",
  //   },
  //   {
  //     image: "./assets/img/img-blog/blog-soap.jpeg",
  //     title: "Твердый шампунь - это мыло за 500 рублей?",
  //     subtitle:
  //       "разбираемся, зачем люди берут твердый уход, и почему это не только про экологию ",
  //   },
];

const config = {
  templateCardEl: ".blog-template__template",
  cardContainer: ".blog-template__template",
};
const cardContainer = document.querySelector(config.cardContainer);
data.forEach((item) => {
  const card = new Blog({
    card: item,
    templateSelector: config.templateCardEl,
  });
  cardContainer.appendChild(card.getCard());
});
