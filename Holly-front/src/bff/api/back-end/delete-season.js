import { removeSeason } from "../../../actions/remove-season";
import { API_URL } from "../../../constants/api";
export const deleteSeason = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/seasons/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    dispatch(removeSeason(id));
  } catch (e) {
    console.error(e);
  }
};
