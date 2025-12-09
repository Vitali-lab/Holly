import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchAllProducts,
  postProduct,
  deleteProduct,
  updateProduct,
  editProductRating,
} from './products';

export const initialFilters = {
  seasons: [],
  categories: [],
  lastPage: 1,
  minPrice: '',
  maxPrice: '',
};

const initialState = {
  products: [],
  allProducts: [],
  isLoading: false,
  error: null,
  lastPage: 1,
  currentPage: 1,
  totalCount: 0,
  filters: initialFilters,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    acSetProducts: (state, action) => {
      state.products = action.payload.products;
      state.lastPage = action.payload.lastPage;
      state.currentPage = action.payload.currentPage;
      state.totalCount = action.payload.totalCount;
    },
    acAddProduct: (state, action) => {
      state.products.push(...action.payload);
    },
    acRemoveProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload.id);
    },
    acSetAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    acSetUpdatedProduct: (state, action) => {
      state.products = state.products.map((p) => (p.id === action.payload.id ? action.payload : p));
    },
    acSetCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    acSetFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    acSetFilterSeason: (state, action) => {
      if (!state.filters.seasons.includes(action.payload)) {
        state.filters.seasons.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.lastPage = action.payload.lastPage;
        state.currentPage = action.payload.currentPage;
        state.totalCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        state.allProducts.push(action.payload);
        state.error = null;
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
        state.allProducts = state.allProducts.filter((p) => p.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );

        state.allProducts = state.allProducts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
        state.error = null;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editProductRating.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      });
  },
});

export const {
  acSetProducts,
  acSetCurrentPage,
  acSetFilters,
  acSetAllProducts,
  acSetFilterSeason,
} = productsSlice.actions;
export default productsSlice.reducer;
