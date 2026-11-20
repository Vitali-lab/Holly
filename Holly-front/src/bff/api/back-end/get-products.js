import { setProducts } from "../../../actions/set-products";
import { API_URL } from "../../../constants/api";

const normalizeProductsResponse = (payload) => {
  if (!payload) {
    return { products: [], lastPage: 1, currentPage: 1 };
  }

  if (payload.data?.products) {
    return {
      products: payload.data.products,
      lastPage: payload.data.lastPage ?? payload.lastPage ?? 1,
      currentPage: payload.data.currentPage ?? payload.currentPage ?? 1,
    };
  }

  return { products: [], lastPage: 1, currentPage: 1 };
};

export const getProducts =
  (limit = 200, page = 1) =>
  async (dispatch) => {
    try {
      const query = new URLSearchParams({ limit, page });
      const response = await fetch(`${API_URL}/products?${query.toString()}`);

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const productsData = await response.json();
      const normalized = normalizeProductsResponse(productsData);

      dispatch(
        setProducts({
          products: normalized.products,
          lastPage: normalized.lastPage,
          currentPage: normalized.currentPage,
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };
