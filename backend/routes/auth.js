import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();
const SECRET_KEY = "secret";

//registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // User.find().then((value) => console.log(value));
  try {
    const userLogin = await User.findOne({ username });
    if (userLogin) {
      return res.status(400).json({ error: "имя пользователя занято" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, cart: [], favourite: [] });

    user
      .save()
      .then((value) => {
        console.log("пользователь успешно зарегистрирован");
        res.status(201).json({ text: "user registred" });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(500).json({ error: "error registration user" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "пользователь не найден" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "вы ввели неверный пароль" });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "9999h" });
    res.json({ token, id: user._id});
  } catch (error) {
    return res.status(500).json({ error });
  }
});


export default router;
