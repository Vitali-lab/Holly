import { Router } from "express";
import { ObjectId } from "mongodb";

import { Product } from "../models/Product.js";
import {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
} from "../controllers/products.js";
import { mapProduct } from "../helpers/mapProduct.js";

const router = Router();

router.get("/products/all", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.send({ data: products.map(mapProduct) });
  } catch (e) {
    console.error("Ошибка в /products/all:", e);
    res.status(500).json({ error: e.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const {
      search = "",
      limit = 10,
      page = 1,
      seasons,
      categories,
      minPrice,
      maxPrice,
    } = req.query;

    const query = {};
    if (seasons) {
      const arr = seasons.split(",").map((id) => new ObjectId(id));
      query.season_id = { $in: arr };
    }
    if (categories) {
      const arr = categories.split(",").map((id) => new ObjectId(id));
      query.category_id = { $in: arr };
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (seasons) {
      query.season_id = { $in: seasons.split(",") };
    }
    if (categories) {
      query.category_id = { $in: categories.split(",") };
    }
    if (minPrice !== undefined && minPrice !== "") {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }
    if (maxPrice !== undefined && maxPrice !== "") {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    const safeLimit = Math.max(1, Math.min(Number(limit) || 10, 100));
    const safePage = Math.max(1, Number(page) || 1);

    const [products, count] = await Promise.all([
      Product.find(query)
        .limit(safeLimit)
        .skip((safePage - 1) * safeLimit)
        .sort({ createdAt: -1 }),
      Product.countDocuments(query),
    ]);

    res.send({
      products: products.map(mapProduct),
      totalCount: count,
      lastPage: Math.ceil(count / safeLimit),
      currentPage: safePage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Ошибка сервера" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Товар не найден" });
    }

    res.json({ data: mapProduct(product) });
  } catch (err) {
    res.status(400).json({ error: "Некорректный ID" });
  }
});

router.patch("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await editProduct(req.params.id, req.body);
    if (!updatedProduct) {
      throw new Error("Товар не найден");
    }
    res.send({ data: mapProduct(updatedProduct) });
  } catch (e) {
    res.status(400).json({ error: "Товар не найден" });
  }
});

router.get("/products/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  res.send({ data: mapProduct(product) });
});

router.post("/products", async (req, res) => {
  const newPost = await addProduct(req.body);
  res.send({ data: mapProduct(newPost) });
});

router.patch("/products/:id", async (req, res) => {
  const updatedPost = await editProduct(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    price: req.body.price,
    sizes: req.body.sizes,
    rating: req.body.rating,
    category_id: req.body.category_id,
    season_id: req.body.season_id,
    sale: req.body.sale,
  });
  res.send({ data: mapProduct(updatedPost) });
});

router.delete("/products/:id", async (req, res) => {
  await deleteProduct(req.params.id);
  res.send({ error: null });
});

export const productRouter = router;

