import { addCategory } from "../../../actions/add-category";
import { API_URL } from "../../../constants/api";

export const postCategory = (name) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const сategory = await response.json();

    if (!сategory) {
      throw new Error("Категория не найдена");
    }
    dispatch(addCategory(сategory));
  } catch (e) {
    console.error(e);
  }
};
