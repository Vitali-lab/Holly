import { Router } from "express";

import {
  register,
  login,
  addFavorites,
  removeFavorites,
  getUser,
  addToCart,
  getUserCart,
  removeFromCart,
  editCartCount,
  clearCart,
  getUsers,
} from "../controllers/user.js";
import { getProduct } from "../controllers/products.js";
import { mapUser } from "../helpers/mapUser.js";
import { mapCartProduct } from "../helpers/mapCartProduct.js";

const router = Router();
const getCart = getUserCart;

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send({ error: null, data: mapUser(user) });
  } catch (err) {
    res.send({
      error: err.message || "Ошибка регистрации",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { token, user } = await login(req.body.email, req.body.password);
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.send({ error: null, user: mapUser(user) });
  } catch (err) {
    res.send({
      error: err.message || "Ошибка авторизации",
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.send({ error: null });
  } catch (err) {
    res.send({
      error: err.message || "Ошибка выхода",
    });
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = await getUser(token);
    if (!user || !token) {
      throw new Error("Пользователь не найден");
    }
    res.send({ data: mapUser(user) });
  } catch (e) {
    res.status(401).json("Пользователь не найден");
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    if (!users) {
      throw new Error("Пользователи не найдены");
    }
    res.send({ data: users.map(mapUser) });
  } catch (e) {
    res.status(400).json({ error: "Пользователи не найдены" });
  }
});

router.get("/users/:id/cart", async (req, res) => {
  try {
    const cart = await getCart(req.params.id);
    if (!cart) {
      throw new Error("Пользователь не найден");
    }
    res.send({ data: cart.map(mapCartProduct) });
  } catch (e) {
    res.status(400).json({ error: "Пользователь не найден" });
  }
});

router.post("/users/:id/cart", async (req, res) => {
  try {
    const newProductInCart = await addToCart(
      req.params.id,
      req.body.productId,
      req.body.customId,
      req.body.size,
      req.body.count
    );

    if (!newProductInCart) {
      throw new Error("Ошибка добавления товара в корзину");
    }

    res.send(newProductInCart);
  } catch (e) {
    res.status(400).json({ error: "Ошибка добавления товара в корзину" });
  }
});

router.put("/users/:userId/cart/:productId", async (req, res) => {
  try {
    await editCartCount(
      req.params.userId,
      req.params.productId,
      Number(req.body.count)
    );

    if (!editCartCount) {
      throw new Error("Ошибка изменения количества товара в корзине");
    }
    res.send({ error: null });
  } catch (e) {
    res
      .status(400)
      .json({ error: "Ошибка изменения количества товара в корзине" });
  }
});

router.patch("/users/:userId/cart", async (req, res) => {
  try {
    await clearCart(req.params.userId);
    if (!clearCart) {
      throw new Error("Ошибка очистки корзины");
    }
    res.send({ error: null });
  } catch (e) {
    res.status(400).json({ error: "Ошибка очистки корзины" });
  }
});

router.delete("/users/:userId/cart/:productId", async (req, res) => {
  try {
    await removeFromCart(req.params.userId, req.params.productId);
    if (!removeFromCart) {
      throw new Error("Ошибка удаления товара из корзины");
    }
    res.send({ error: null });
  } catch (e) {
    res.status(400).json({ error: "Ошибка удаления товара из корзины" });
  }
});

router.post("/users/:id/favorites", async (req, res) => {
  try {
    const product = await getProduct(req.body.id);

    const id = await addFavorites(req.params.id, product._id);
    res.send({ id });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.delete("/users/:userId/favorites/:productId", async (req, res) => {
  await removeFavorites(req.params.userId, req.params.productId);
  res.send({ error: null });
});

export const userRouter = router;
