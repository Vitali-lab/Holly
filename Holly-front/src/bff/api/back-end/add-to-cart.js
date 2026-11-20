import { addInCart } from "../../../actions/add-in-cart";
import { API_URL } from "../../../constants/api";

export const addToCart =
  (userId, productId, customId, size, count, sale) => async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          customId,
          size,
          count,
          sale,
        }),
      });
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const cart = await response.json();

      if (!cart) {
        throw new Error("Товар не найден");
      }

      dispatch(addInCart(cart));
    } catch (e) {
      console.error(e);
    }
  };
