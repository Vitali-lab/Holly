import { API_URL } from "../../../constants/api";

export const auth = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const user = await response.json();
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    return user;
  } catch (err) {
    console.error(err);
  }
};
