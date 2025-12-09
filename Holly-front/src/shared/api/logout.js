import { setUser } from '../actions/set-user';
import { API_URL } from '../constants/api';

export const logout = () => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    dispatch(setUser(null));
  } catch (e) {
    console.error(e);
  }
};
