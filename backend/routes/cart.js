import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const router = express.Router();

router.get("/cart/:id", async (req, res) => {
  const id = req.params.id;
  //   console.log(id);

  try {
    const findedUser = await User.findOne({ _id: id });
    res.status(200).json(findedUser.cart);
  } catch (error) {
    res.status(400).json({ error: "Пользователь не найден!" });
  }

  // console.log(findedCard);
  // if (findedCard) {
  //     res.status(200).json(findedCard);
  // }
});

router.post("/cart/:id", async (req, res) => {
  const _id = req.params.id;
  const productId = req.body.productId;
  try {
    const findedUser = await User.findOne({ _id });
    const result = await User.findByIdAndUpdate(_id, {
      cart: [...findedUser.cart, productId],
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.patch("/cart/:id", async (req, res) => {
  const _id = req.params.id;
  const productId = req.body.productId;
  try {
    const findedUser = await User.findOne({ _id }); //нашли пользователя
    const result = await User.findByIdAndUpdate(_id, {
      cart: [...findedUser.cart.filter((item) => item !== productId)],
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});
export default router;
