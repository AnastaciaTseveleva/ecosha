import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Item from "../models/Item.js";
const router = express.Router();

router.get("/catalog", async (req, res) => {
  const catalog = await Item.find();
  res.status(200).json(catalog);
});

// catalog/categories
////все  категории
// router.get("/catalog/categories", async (req, res) => {
//   const catalog = await Item.find();
//   const category = [];
//   catalog.forEach((item) => {
//     if (!category.includes(item.category)) {
//       category.push(item.category);
//     }
//   });
//   res.status(200).json(category);
// });

////в категориях подкатегории
router.get("/catalog/categories", async (req, res) => {
  const catalog = await Item.find();
  const categories = {};

  catalog.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    if (!categories[item.category].includes(item.subcategory)) {
      categories[item.category].push(item.subcategory);
    }
  });
  res.status(200).json(categories);
});

////это мы ищем товары в категориях и подкатегориях
router.get("/catalog/products", async (req, res) => {
  const { category, subcategory } = req.query;
  let products = [];
  if (category) {
    products = await Item.find({ category });
  } else if (subcategory) {
    products = await Item.find({ subcategory });
  }
  res.status(200).json(products);
});

/////это я написала
router.get("/catalog/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getProduct = await Item.findOne({ _id: id });
    res.status(200).json(getProduct);
  } catch (error) {
    res.status(400).json({ error: "товар не найден!" });
  }
});

export default router;
