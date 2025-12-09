import { Product } from "../models/Product.js";
import mongoose from "mongoose";
// add
export const addProduct = async (product) => {
  const { season_id, category_id } = product;

  if (!mongoose.Types.ObjectId.isValid(season_id)) {
    throw new Error(`Invalid season_id: ${season_id}`);
  }

  if (!mongoose.Types.ObjectId.isValid(category_id)) {
    throw new Error(`Invalid category_id: ${category_id}`);
  }
  const preparedProduct = {
    ...product,
    season_id: new mongoose.Types.ObjectId(product.season_id.trim()),
    category_id: new mongoose.Types.ObjectId(product.category_id.trim()),
  };
  return Product.create(preparedProduct);
};

// remove

// edit
export const editProduct = async (id, product) => {
  const newProduct = await Product.findOneAndUpdate({ _id: id }, product, {
    returnDocument: "after",
  });
  return newProduct;
};

export const deleteProduct = async (id) => {
  return Product.findByIdAndDelete(id);
};

// get  list with search and pagination

export const getProducts = async ({
  search = "",
  limit,
  page,
  seasons,
  categories,
  minPrice,
  maxPrice,
} = {}) => {
  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  if (seasons) {
    query.seasonId = { $in: seasons.split(",") };
  }
  if (categories) {
    query.categoryId = { $in: categories.split(",") };
  }
  if (minPrice) {
    query.price = { ...query.price, $gte: Number(minPrice) };
  }
  if (maxPrice) {
    query.price = { ...query.price, $lte: Number(maxPrice) };
  }

  let productsQuery = Product.find(query).sort({ createdAt: -1 });

  // применяем пагинацию только если limit и page заданы
  if (limit && page) {
    const safeLimit = Math.max(1, Math.min(Number(limit), 100));
    const safePage = Math.max(1, Number(page));
    productsQuery = productsQuery
      .limit(safeLimit)
      .skip((safePage - 1) * safeLimit);

    const count = await Product.countDocuments(query);

    return {
      totalCount: count,
      products: await productsQuery,
      lastPage: Math.max(1, Math.ceil(count / safeLimit)),
      currentPage: safePage,
    };
  }

  // если limit/page не заданы → возвращаем весь список
  const products = await productsQuery;
  return {
    totalCount: products.length,
    products,
    lastPage: 1,
    currentPage: 1,
  };
};

// get item

export const getProduct = async (id) => {
  try {
    return await Product.findById(id);
  } catch (err) {
    throw new Error("Некорректный ID");
  }
};
