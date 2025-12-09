import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, API_URL_USERS } from '../../shared/config/api';
import { apiRequest } from '../../shared/lib/apiReqest';

//загрузка пользователя
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const user = await apiRequest(`${API_URL}/me`, {
      method: 'GET',
      credentials: 'include',
    });

    return user.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const users = await apiRequest(`${API_URL_USERS}`, {
      method: 'GET',
      credentials: 'include',
    });
    return users.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

//выход
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await apiRequest(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

//добавление в избранное
export const addToFavorites = createAsyncThunk(
  'user/addToFavorites',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`${API_URL_USERS}/${userId}/favorites`, {
        method: 'POST',
        data: { id: productId },
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//удаление из избранного
export const deleteFromFavorites = createAsyncThunk(
  'user/deleteFromFavorites',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await apiRequest(`${API_URL_USERS}/${userId}/favorites/${productId}`, {
        method: 'DELETE',
      });
      return productId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//добавление в корзину
export const addToCart = createAsyncThunk(
  'user/addToCart',
  async ({ cartItem, userId }, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`${API_URL_USERS}/${userId}/cart`, {
        method: 'POST',
        data: cartItem,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const deleteFromCart = createAsyncThunk(
  'user/deleteFromCart',
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      await apiRequest(`${API_URL_USERS}/${userId}/cart/${productId}`, {
        method: 'DELETE',
      });
      return productId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//обновление количества товаров в корзине
export const updateCartItemCount = createAsyncThunk(
  'user/updateCartItemCount',
  async ({ userId, itemId, count }, { rejectWithValue }) => {
    try {
      await apiRequest(`${API_URL_USERS}/${userId}/cart/${itemId}`, {
        method: 'PUT',
        data: { count },
      });
      return { id: itemId, count };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// очистка корзины
export const emptyCart = createAsyncThunk('user/emptyCart', async (userId, { rejectWithValue }) => {
  try {
    await apiRequest(`${API_URL_USERS}/${userId}/cart`, {
      method: 'PATCH',
    });

    return userId;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});
