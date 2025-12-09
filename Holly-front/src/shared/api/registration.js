import { API_URL_REGISTRATION } from '../config/api';
import { apiRequest } from '../lib/apiReqest';

export const registration = async (name, email, password) => {
  try {
    const data = await apiRequest(`${API_URL_REGISTRATION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      data: {
        name,
        email,
        password,
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};
