import { configureStore } from '@reduxjs/toolkit';

import categoriesSlice from '../../features/categories/caregoriesSlice';
import seasonsSlice from '../../features/seasons/seasonsSlice';
import productsSlice from '../../features/products/productsSlice';
import userSlice from '../../features/user/userSlice';
import productSlice from '../../features/product/productSlice';
import widgetsSlice from '../../features/widgets/widgetsSlice';
import orderSlice from '../../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    orders: orderSlice,
    seasons: seasonsSlice,
    categories: categoriesSlice,
    user: userSlice,
    product: productSlice,
    products: productsSlice,
    widgets: widgetsSlice,
  },
});
