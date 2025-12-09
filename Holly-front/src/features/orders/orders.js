import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ORDERS } from '../../shared/config/api';
import { apiRequest } from '../../shared/lib/apiReqest';

//загрузка списка заказов
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_ORDERS}`);
      return data.orders;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// создание заказа
export const postOrder = createAsyncThunk(
  'orders/postOrder',
  async (order, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_ORDERS}`, {
        method: 'POST',
        data: order,
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// обновление статуса заказа
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_ORDERS}/${id}`, {
        method: 'PATCH',
        data: { status },
      });

      return data.order;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
