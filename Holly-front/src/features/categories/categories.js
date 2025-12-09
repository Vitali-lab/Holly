import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_CATEGORIES } from '../../shared/config/api';
import { apiRequest } from '../../shared/lib/apiReqest';

//загрузка списка категорий
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`${API_URL_CATEGORIES}`);
      return response.categories;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// удаление категории
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest(`${API_URL_CATEGORIES}/${id}`, {
        method: 'DELETE',
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// добавление категории
export const postCategory = createAsyncThunk(
  'categories/postCategory',
  async (newCategory, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_CATEGORIES}`, {
        method: 'POST',
        data: { name: newCategory },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
