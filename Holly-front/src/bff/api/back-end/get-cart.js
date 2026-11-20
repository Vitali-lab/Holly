import { setCart } from "../../../actions/set-catr";
import { API_URL } from "../../../constants/api";

export const getCart = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/cart`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const cart = await response.json();
    if (!cart) {
      throw new Error("Корзина не найдена");
    }
    dispatch(setCart(cart));
  } catch (e) {
    console.error(e);
  }
};
