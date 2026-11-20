import { API_URL } from "../../../constants/api";
export const getProductRating = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}/rating`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const rating = await response.json();
    if (!rating) {
      throw new Error("Рейтинг не найден");
    }
    return rating.data;
  } catch (e) {
    console.error(e);
  }
};
