import { addUserLikes } from "../../../actions/add-user-likes";
import { API_URL } from "../../../constants/api";

export const addToFavorites = (userId, productId) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    });
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const updatedUser = await response.json();

    if (!updatedUser) {
      throw new Error("Товар не найден");
    }

    dispatch(addUserLikes(updatedUser));
  } catch (e) {
    console.error(e);
  }
};
