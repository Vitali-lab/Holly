import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_SEASONS } from '../../shared/config/api';
import { apiRequest } from '../../shared/lib/apiReqest';

//загрузка списка сезонов
export const fetchSeasons = createAsyncThunk(
  'seasons/fetchSeasons',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_SEASONS}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//добавление сезона
export const addSeason = createAsyncThunk(
  'seasons/addSeasons',
  async (newSeason, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_SEASONS}`, {
        method: 'POST',
        data: { data: newSeason },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//удаление сезона
export const deleteSeason = createAsyncThunk(
  'seasons/removeSeason',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest(`${API_URL_SEASONS}/${id}`, {
        method: 'DELETE',
      });

      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
