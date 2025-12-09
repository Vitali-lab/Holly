import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { generate } from "../helpers/token.js";
import mongoose from "mongoose";
import pkg from "jsonwebtoken";

export const getUsers = async () => {
  return await User.find();
};

// register

export const getUserById = async (id) => {
  return await User.findOne(id);
};

export const getUser = async (token) => {
  const { verify } = pkg;
  const data = verify(token, process.env.JWT_SECRET || "secret");

  if (!data) {
    throw new Error("Пользователь не найден");
  }

  return await User.findById(data.id);
};

export const register = async (name, email, password) => {
  try {
    if (!password) throw new Error("Пароль не может быть пустым");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Такой Email уже зарегистрирован");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: passwordHash });
    const token = generate({ id: user._id });

    return { user, token };
  } catch (err) {
    throw new Error(err.message || "Ошибка регистрации");
  }
};

// login
export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) {
    throw new Error("Неверный пароль");
  }
  const token = generate({ id: user._id });

  return { token, user };
};

export const getUserCart = async (userId) => {
  const user = await User.findById(userId);
  return user.cart;
};

export const addToCart = async (
  userId,
  productId,
  customId,
  size,
  count,
  sale
) => {
  const newProductInCart = { userId, productId, customId, size, count, sale };
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    {
      $push: {
        cart: {
          productId,
          customId,
          size,
          count,
          sale,
        },
      },
    },
    { new: true }
  );

  return newProductInCart;
};

export const editCartCount = async (userId, itemId, count) => {
  const user = await User.findOneAndUpdate(
    { _id: userId, "cart.customId": itemId },
    { $set: { "cart.$.count": Number(count) } },
    { new: true }
  );
  return user;
};

export const removeFromCart = async (userId, customId) => {
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { cart: { customId } } },
    { new: true }
  );
  return user;
};

export const clearCart = async (userId) => {
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { cart: [] } },
    { new: true }
  );
  return user;
};

export const addFavorites = async (userId, productId) => {
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { favorites: { id: productId } } },
    { new: true }
  );

  return productId;
};

export const removeFavorites = async (userId, productId) => {
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { favorites: { id: new mongoose.Types.ObjectId(productId) } } },
    { new: true }
  );

  return user;
};
// logout
