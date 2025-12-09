import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, postCategory, deleteCategory } from './categories';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    acAddCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    acRemoveCategory: (state, action) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
        state.error = null;
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter((c) => c.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { acAddCategory, acRemoveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

// src/
//  ├─ store/
//  │   └─ store.js              ← конфигурация стора
//  ├─ features/
//  │   └─ categories/
//  │       ├─ categoriesSlice.js ← slice + extraReducers
//  │       ├─ categoriesThunks.js ← асинхронные thunks (fetchCategories, postCategory)
//  │       └─ selectors.js       ← селекторы
//  └─ constants/
//      └─ api.js
