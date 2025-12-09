import { createSlice } from '@reduxjs/toolkit';
import { fetchProduct, editProductRating } from '../products/products';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
  },
  reducers: {
    acSetProduct: (state, action) => {
      state.product = action.payload;
    },
    acAddRating: (state, action) => {
      state.product.rating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.product = {};
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(editProductRating.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
