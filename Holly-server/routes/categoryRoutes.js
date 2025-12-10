import { Router } from "express";

import {
  addCategory,
  fetchCategories,
  deleteCategory,
} from "../controllers/categories.js";
import { mapCategories } from "../helpers/mapCategories.js";
import { mapSeasons } from "../helpers/mapSeasons.js";

const router = Router();

(addCategory, fetchCategories, deleteCategory);

router.get("/", async (req, res) => {
  const categories = await fetchCategories();
  res.send({ categories: categories.map(mapSeasons) });
});

router.post("/", async (req, res) => {
  const newCategory = await addCategory({ name: req.body.name });
  res.send(mapCategories(newCategory));
});

router.delete("/:id", async (req, res) => {
  await deleteCategory(req.params.id);
  res.send({ error: null });
});

export const categoryRouter = router;
