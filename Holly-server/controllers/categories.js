import { Categories } from "../models/Categories.js";

export const fetchCategories = async () => {
  return await Categories.find();
};

export const addCategory = async (category) => {
  return await Categories.create(category);
};

export const deleteCategory = async (id) => {
  return await Categories.findByIdAndDelete(id);
};
