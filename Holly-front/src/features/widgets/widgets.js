import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_WIDGETS } from '../../shared/config/api';
import { apiRequest } from '../../shared/lib/apiReqest';

//загрузка виджетов
export const fetchWidgets = createAsyncThunk(
  'seasons/fetchWidgets',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_WIDGETS}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//добавление виджета
export const addWidget = createAsyncThunk(
  'widgets/addWidget',
  async (newWidget, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_WIDGETS}`, {
        method: 'POST',
        data: newWidget,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//удаление виджета
export const deleteWidget = createAsyncThunk(
  'widgets/deleteWidget',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest(`${API_URL_WIDGETS}/${id}`, {
        method: 'DELETE',
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// изменение виджета
export const updateWidget = createAsyncThunk(
  'widgets/updateWidget',
  async ({ id, widget }, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_WIDGETS}/${id}`, {
        method: 'PATCH',
        data: widget,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
