import { setUser } from "../../../actions/set-user";
import { API_URL } from "../../../constants/api";

export const getUserToken = () => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const userData = await response.json();
    const user = userData?.data;

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    dispatch(setUser(user));
  } catch (e) {
    if (!String(e.message).includes("401")) {
      console.error(e);
    }
  }
};
