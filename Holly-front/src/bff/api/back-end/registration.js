import { setUser } from "../../../actions/set-user";
import { API_URL } from "../../../constants/api";

export const registration = (name, email, password) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`,
      );
    }
    const user = await response.json();
    if (user.error) {
      throw new Error(user.error || "Пользователь не найден");
    }
    dispatch(setUser(user.data));
    return user.data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};
