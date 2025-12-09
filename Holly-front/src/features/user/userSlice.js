import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUser,
  fetchUsers,
  logout,
  addToFavorites,
  deleteFromFavorites,
  addToCart,
  deleteFromCart,
  updateCartItemCount,
  emptyCart,
} from './user.js';

const initialState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    acSetUser: (state, action) => {
      state.currentUser = action.payload;
    },
    acSetUsers: (state, action) => {
      state.users = action.payload;
    },
    acSetCart: (state, action) => {
      state.currentUser.cart = action.payload;
    },
    acLogout: (state) => {
      state.currentUser = null;
    },
    acAddToFavorites: (state, action) => {
      state.currentUser.favorites.push(action.payload);
    },
    acDeleteFromFavorites: (state, action) => {
      state.currentUser.favorites = state.currentUser.favorites.filter(
        (f) => f.id !== action.payload
      );
    },
    acAddToCard: (state, action) => {
      state.currentUser.cart.push(action.payload);
    },
    acDeleteFromCart: (state, action) => {
      state.currentUser.cart = state.currentUser.cart.filter((c) => c.customId !== action.payload);
    },
    acUpdateCartItemCount: (state, action) => {
      state.currentUser.cart = state.currentUser.cart.map((c) =>
        c.customId === action.payload.id ? { ...c, count: action.payload.count } : c
      );
    },
    acEmptyCart: (state) => {
      state.currentUser.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser.favorites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteFromFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser.favorites = state.currentUser.favorites.filter(
          (f) => f.id !== action.payload
        );
      })
      .addCase(deleteFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser.cart.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser.cart = state.currentUser.cart.filter(
          (c) => c.customId !== action.payload
        );
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItemCount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItemCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser.cart = state.currentUser.cart.map((c) =>
          c.customId === action.payload.id ? { ...c, count: action.payload.count } : c
        );
      })
      .addCase(updateCartItemCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(emptyCart.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser.cart = [];
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { acSetUser, acSetCart } = userSlice.actions;
export default userSlice.reducer;
