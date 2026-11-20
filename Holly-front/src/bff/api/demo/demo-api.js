import {
  DEMO_CATEGORIES,
  DEMO_PRODUCTS,
  DEMO_REVIEWS,
  DEMO_SEASONS,
  DEMO_USERS,
} from "./demo-data.js";

const STORAGE_KEY = "holly-demo-store";
const SESSION_KEY = "holly-demo-session";
const STORAGE_VERSION = "v3";

const seedProducts = () =>
  DEMO_PRODUCTS.map((item) => {
    const reviews = DEMO_REVIEWS.filter((review) => review.postId === item.id);
    if (reviews.length === 0) {
      return item;
    }

    return {
      ...item,
      rating: { ...item.rating, users: reviews },
    };
  });

const seedStore = () => ({
  version: STORAGE_VERSION,
  products: seedProducts(),
  categories: DEMO_CATEGORIES,
  seasons: DEMO_SEASONS,
  users: DEMO_USERS,
  orders: [],
});

const loadStore = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved?.version === STORAGE_VERSION) {
      return saved;
    }
  } catch (error) {
    console.error(error);
  }

  const store = seedStore();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  return store;
};

const saveStore = (store) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

const mapUser = (user) => ({
  name: user.name,
  email: user.email,
  role: user.role,
  id: user.id,
  favorites: user.favorites || [],
  cart: user.cart || [],
});

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const getSessionUser = (store) => {
  const sessionId = localStorage.getItem(SESSION_KEY);
  return store.users.find((user) => user.id === sessionId) || null;
};

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const findProduct = (store, id) =>
  store.products.find((product) => String(product.id) === String(id));

const createCartItem = (product, body) => ({
  id: body.customId,
  productId: product.id,
  name: product.name,
  images: product.images,
  description: product.description,
  price: product.price,
  rating: product.rating,
  customId: body.customId,
  size: body.size,
  count: body.count,
  sale: product.sale ?? null,
});

const loginUser = (store, body) => {
  const email = (body.email || "").trim().toLowerCase();
  let user = store.users.find(
    (item) => item.email.toLowerCase() === email,
  );

  if (!user) {
    user = {
      id: `u-${Date.now()}`,
      name: email.split("@")[0] || "Гость",
      email,
      password: body.password,
      role: 1,
      favorites: [],
      cart: [],
    };
    store.users.push(user);
  }

  return user;
};

const handleRequest = (store, method, pathname, query, body) => {
  if (pathname === "/products" && method === "GET") {
    const search = (query.get("search") || "").toLowerCase();
    const limit = toNumber(query.get("limit"), 200);
    const page = toNumber(query.get("page"), 1);

    const filtered = store.products.filter(
      (product) =>
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.tags.some((tag) => tag.toLowerCase().includes(search)),
    );

    const start = (page - 1) * limit;

    return json({
      data: {
        products: filtered.slice(start, start + limit),
        lastPage: Math.max(1, Math.ceil(filtered.length / limit)),
        currentPage: page,
        totalCount: filtered.length,
      },
    });
  }

  const productRating = pathname.match(/^\/products\/([^/]+)\/rating$/);
  if (productRating && method === "GET") {
    const product = findProduct(store, productRating[1]);

    if (!product) {
      return json({ error: "Товар не найден" }, 404);
    }

    return json({
      data: product.rating || { overallRating: 0, users: [] },
    });
  }

  const productItem = pathname.match(/^\/products\/([^/]+)$/);
  if (productItem) {
    const product = findProduct(store, productItem[1]);

    if (!product && method !== "POST") {
      return json({ error: "Товар не найден" }, 404);
    }

    if (method === "GET") {
      return json({ data: product });
    }

    if (method === "PATCH") {
      Object.assign(product, body);
      saveStore(store);
      return json({ data: product });
    }

    if (method === "DELETE") {
      store.products = store.products.filter(
        (item) => String(item.id) !== String(productItem[1]),
      );
      saveStore(store);
      return json({ data: product });
    }
  }

  if (pathname === "/products" && method === "POST") {
    const created = {
      id: `p-${Date.now()}`,
      likes: 0,
      reviews: [],
      publishedAt: new Date().toISOString(),
      ...body,
    };

    store.products.push(created);
    saveStore(store);
    return json({ data: created });
  }

  if (pathname === "/categories") {
    if (method === "GET") {
      return json({ categories: store.categories });
    }

    if (method === "POST") {
      const category = { id: `c-${Date.now()}`, name: body.name };
      store.categories.push(category);
      saveStore(store);
      return json(category);
    }
  }

  const categoryItem = pathname.match(/^\/categories\/([^/]+)$/);
  if (categoryItem && method === "DELETE") {
    store.categories = store.categories.filter(
      (category) => String(category.id) !== String(categoryItem[1]),
    );
    saveStore(store);
    return json({ data: {} });
  }

  if (pathname === "/seasons") {
    if (method === "GET") {
      return json({ data: store.seasons });
    }

    if (method === "POST") {
      const season = { id: `s-${Date.now()}`, name: body.name };
      store.seasons.push(season);
      saveStore(store);
      return json(season);
    }
  }

  const seasonItem = pathname.match(/^\/seasons\/([^/]+)$/);
  if (seasonItem && method === "DELETE") {
    store.seasons = store.seasons.filter(
      (season) => String(season.id) !== String(seasonItem[1]),
    );
    saveStore(store);
    return json({ data: {} });
  }

  if (pathname === "/login" && method === "POST") {
    const user = loginUser(store, body);
    saveStore(store);
    localStorage.setItem(SESSION_KEY, user.id);
    return json({ error: null, user: mapUser(user) });
  }

  if (pathname === "/register" && method === "POST") {
    const email = (body.email || "").trim().toLowerCase();
    const exists = store.users.some(
      (user) => user.email.toLowerCase() === email,
    );

    if (exists) {
      return json({ error: "Пользователь с таким email уже существует" });
    }

    const user = {
      id: `u-${Date.now()}`,
      name: body.name,
      email,
      password: body.password,
      role: 1,
      favorites: [],
      cart: [],
    };

    store.users.push(user);
    saveStore(store);
    localStorage.setItem(SESSION_KEY, user.id);
    return json({ error: null, data: mapUser(user) });
  }

  if (pathname === "/logout" && method === "POST") {
    localStorage.removeItem(SESSION_KEY);
    return json({ error: null });
  }

  if (pathname === "/me" && method === "GET") {
    const user = getSessionUser(store);
    return user
      ? json({ data: mapUser(user) })
      : json({ error: "Пользователь не найден" }, 401);
  }

  if (pathname === "/users" && method === "GET") {
    return json({ data: store.users.map(mapUser) });
  }

  const userFavorites = pathname.match(/^\/users\/([^/]+)\/favorites$/);
  if (userFavorites) {
    const user = store.users.find(
      (item) => String(item.id) === String(userFavorites[1]),
    );

    if (!user) {
      return json({ error: "Пользователь не найден" }, 404);
    }

    if (method === "GET") {
      return json(user);
    }

    if (method === "POST") {
      const product = findProduct(store, body.id);
      if (product) {
        user.favorites = [...(user.favorites || []), product];
        saveStore(store);
      }
      return json({ id: body.id });
    }
  }

  const userFavoriteItem = pathname.match(
    /^\/users\/([^/]+)\/favorites\/([^/]+)$/,
  );
  if (userFavoriteItem && method === "DELETE") {
    const user = store.users.find(
      (item) => String(item.id) === String(userFavoriteItem[1]),
    );

    if (user) {
      user.favorites = (user.favorites || []).filter(
        (product) => String(product.id) !== String(userFavoriteItem[2]),
      );
      saveStore(store);
    }

    return json({ error: null });
  }

  const userCartItem = pathname.match(/^\/users\/([^/]+)\/cart\/([^/]+)$/);
  if (userCartItem) {
    const user = store.users.find(
      (item) => String(item.id) === String(userCartItem[1]),
    );

    if (!user) {
      return json({ error: "Пользователь не найден" }, 404);
    }

    if (method === "PUT") {
      user.cart = (user.cart || []).map((item) =>
        String(item.customId) === String(userCartItem[2])
          ? { ...item, count: body.count }
          : item,
      );
      saveStore(store);
      return json({ error: null });
    }

    if (method === "DELETE") {
      user.cart = (user.cart || []).filter(
        (item) => String(item.customId) !== String(userCartItem[2]),
      );
      saveStore(store);
      return json({ error: null });
    }
  }

  const userCart = pathname.match(/^\/users\/([^/]+)\/cart$/);
  if (userCart) {
    const user = store.users.find(
      (item) => String(item.id) === String(userCart[1]),
    );

    if (!user) {
      return json({ error: "Пользователь не найден" }, 404);
    }

    if (method === "GET") {
      return json({ data: user.cart || [] });
    }

    if (method === "POST") {
      const product = findProduct(store, body.productId);
      if (!product) {
        return json({ error: "Товар не найден" }, 404);
      }

      const cartItem = createCartItem(product, body);
      user.cart = [...(user.cart || []), cartItem];
      saveStore(store);
      return json(cartItem);
    }

    if (method === "DELETE" || method === "PATCH") {
      user.cart = [];
      saveStore(store);
      return json({ error: null });
    }
  }

  const userItem = pathname.match(/^\/users\/([^/]+)$/);
  if (userItem) {
    const user = store.users.find(
      (item) => String(item.id) === String(userItem[1]),
    );

    if (!user) {
      return json({ error: "Пользователь не найден" }, 404);
    }

    if (method === "PATCH") {
      Object.assign(user, body);
      saveStore(store);
      return json(user);
    }

    if (method === "GET") {
      return json({ data: mapUser(user) });
    }
  }

  if (pathname === "/orders" && method === "GET") {
    return json({ orders: store.orders });
  }

  if (pathname === "/orders" && method === "POST") {
    const order = {
      id: `order-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    store.orders.push(order);
    saveStore(store);
    return json(order);
  }

  return null;
};

export const installDemoApi = () => {
  if (window.__hollyDemoApi) {
    return;
  }
  window.__hollyDemoApi = true;

  const originalFetch = window.fetch.bind(window);
  let store = loadStore();

  window.fetch = async (input, init = {}) => {
    const url = new URL(
      typeof input === "string" ? input : input.url,
      window.location.origin,
    );

    const isDemoRequest =
      url.port === "3005" ||
      url.port === "4000" ||
      url.port === "5678" ||
      url.pathname.startsWith("/api/");

    if (!isDemoRequest) {
      return originalFetch(input, init);
    }

    if (url.port === "5678") {
      return json({ ok: true });
    }

    const method = (init.method || "GET").toUpperCase();
    let body = {};

    if (init.body) {
      try {
        body = JSON.parse(init.body);
      } catch (error) {
        console.error(error);
      }
    }

    const response = handleRequest(
      store,
      method,
      url.pathname,
      url.searchParams,
      body,
    );

    if (response) {
      return response;
    }

    return json({ error: "Демо-метод не реализован" }, 404);
  };
};
