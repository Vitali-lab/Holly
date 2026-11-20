import { API_URL } from "../../../constants/api";

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const users = await response.json();
    if (!users) {
      throw new Error("Пользователи не найдены");
    }
    return users;
  } catch (e) {
    console.error(e);
  }
};
