import { clearCart } from "../../../actions/clear-cart";
import { API_URL } from "../../../constants/api";

export const emptyCart = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/cart`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    dispatch(clearCart());
  } catch (e) {
    console.error(e);
  }
};
