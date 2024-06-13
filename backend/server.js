import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import bcrypt from "bcrypt";
import cors from "cors";
import User from "./models/User.js";
import Item from "./models/Item.js";
import catalogRouter from "./routes/catalog.js";
import cartRouter from "./routes/cart.js";

//я
import favouriteRouter from "./routes/favorites.js";

const app = express();
const PORT = 3000;
const MONGO_URL = "mongodb://localhost:27017/authdb";

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api", cartRouter);
app.use("/api", catalogRouter);
app.use("/api", favouriteRouter);

// app.use("/api/catalog", catalogRouter);

// app.get("/api/catalog", async (req, res) => {
//   // Item.find()
//   //   .then((value) => console.log(value))
//   //   .cath((err) => console.log(err));
//   const catalog = await Item.find();
//   console.log(catalog);
//   // res.status(200);
//   res.status(200).json(catalog);
// });

app.use(express.static("public")); // http://localhost:3000/cloth/socks/socks-first-1.webp

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected mongoDB");
    app.listen(PORT, () => {
      console.log("server started on port 3000");
    });
  });
