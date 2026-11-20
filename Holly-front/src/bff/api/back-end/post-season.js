import { addSeason } from "../../../actions/add-season";
import { API_URL } from "../../../constants/api";
export const postSeason = (name) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/seasons`, {
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
    const season = await response.json();

    if (!season) {
      throw new Error("Сезон не найден");
    }
    dispatch(addSeason(season));
  } catch (e) {
    console.error(e);
  }
};
