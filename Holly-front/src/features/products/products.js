import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_PRODUCTS } from '../../shared/config/api';
import { apiRequest } from '../../shared/lib/apiReqest';
import { getAverageProductRating } from '../../shared/lib/getAverageProductRating';

//загрузка списка продуктов с пагинацией и фильтрацией
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const { limit, page, seasons, categories, minPrice, maxPrice } = filters;

      const params = { limit, page };
      if (seasons?.length) {
        params.seasons = filters.seasons.filter(Boolean).join(',');
      }
      if (categories?.length) params.categories = filters.categories.join(',');
      if (minPrice) params.minPrice = filters.minPrice;
      if (maxPrice) params.maxPrice = filters.maxPrice;

      const query = new URLSearchParams(params);

      const productsData = await apiRequest(`${API_URL_PRODUCTS}?${query.toString()}`);

      return productsData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// загрузка всех продуктов
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiRequest(`${API_URL_PRODUCTS}/all`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// добавление продукта
export const postProduct = createAsyncThunk(
  'products/postProducts',
  async (newProduct, { rejectWithValue }) => {
    try {
      await apiRequest(`${API_URL_PRODUCTS}`, {
        method: 'POST',
        data: newProduct,
      });
      return newProduct;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// удаление продукта
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest(`${API_URL_PRODUCTS}/${id}`, {
        method: 'DELETE',
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// обновление продукта
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`${API_URL_PRODUCTS}/${productId}`, {
        method: 'PATCH',
        data: updatedProduct,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProductSizeCount = createAsyncThunk(
  'products/updateProduct',
  async (post, { rejectWithValue }) => {
    const { productId, updatedProduct } = post;
    try {
      const response = await apiRequest(`${API_URL_PRODUCTS}/${productId}`, {
        method: 'PUT',
        data: { sizes: updatedProduct },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// получение продукта
export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`${API_URL_PRODUCTS}/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// получение рейтинга продукта
export const getProductRating = async (id) => {
  try {
    const response = await apiRequest(`${API_URL_PRODUCTS}/${id}`);
    return response.data.rating;
  } catch (e) {
    console.error(e);
  }
};

// редактирование рейтинга
export const editProductRating = createAsyncThunk(
  'products/editRating',
  async ({ data }, { rejectWithValue }) => {
    console.log(data, 'asdad');

    try {
      const { userId, userRating, postId } = data;

      const { newProductRating, productRating } = await getAverageProductRating(
        postId,
        userRating,
        userId
      );

      const updatedProduct = await apiRequest(`${API_URL_PRODUCTS}/${postId}`, {
        method: 'PATCH',
        data: {
          rating: {
            overallRating: Number(newProductRating),
            users: [...productRating.users, { ...data }],
          },
        },
      });

      console.log(updatedProduct, 'updatedProduct');

      return updatedProduct.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
