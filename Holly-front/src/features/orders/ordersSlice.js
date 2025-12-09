import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders, postOrder, updateOrderStatus } from './orders';

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    acSetOrders: (state, action) => {
      state.orders = action.payload;
    },
    acAddOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    acUpdateOrder: (state, action) => {
      state.orders = state.orders.map((order) => {
        if (order.id === action.payload.id) {
          return action.payload;
        }
        return order;
      });
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return action.payload;
          }
          return order;
        });
      });
  },
});

export const { acSetOrders, addOrder, updateOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
