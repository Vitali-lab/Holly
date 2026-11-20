import { setSeasons } from "../../../actions/set-seasons";
import { API_URL } from "../../../constants/api";

export const getSeasons = () => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/seasons`);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    const seasonsData = await response.json();
    const seasons = seasonsData.data;

    if (!seasons) {
      throw new Error("Сезоны не найдены");
    }

    dispatch(setSeasons(seasons));
  } catch (e) {
    console.error(e);
  }
};
