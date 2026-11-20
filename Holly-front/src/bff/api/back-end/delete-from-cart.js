import { removeCartItem } from "../../../actions/remove-cart-item";
import { API_URL } from "../../../constants/api";
export const deleteCatrItem = (userId, productId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${userId}/cart/${productId}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    dispatch(removeCartItem(productId));
  } catch (e) {
    console.error(e);
  }
};
