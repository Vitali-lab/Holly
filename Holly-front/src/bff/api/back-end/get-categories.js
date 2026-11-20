import { setCategories } from "../../../actions/set-categories";
import { API_URL } from "../../../constants/api";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const categories = await response.json();

    if (!categories) {
      throw new Error("Категории не найдены");
    }

    dispatch(setCategories(categories.categories));
  } catch (e) {
    console.error(e);
  }
};
