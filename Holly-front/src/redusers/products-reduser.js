import { ACTION_TYPE } from "../actions/type";

const initialFilters = {
  seasons: [],
  categories: [],
  minPrice: "",
  maxPrice: "",
};

const initialAppState = {
  products: [],
  lastPage: 0,
  currentPage: 1,
  categories: [],
  filters: initialFilters,
};

export const productsReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload.products,
        lastPage: action.payload.lastPage,
        currentPage: action.payload.currentPage,
      };
    }
    case ACTION_TYPE.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case ACTION_TYPE.SET_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    }

    case ACTION_TYPE.ADD_PRODUCT: {
      return { ...state, products: [...state.products, action.payload] };
    }
    case ACTION_TYPE.UPDATE_PRODUCT: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? action.payload.updatedProduct
            : product,
        ),
      };
    }
    case ACTION_TYPE.REMOVE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
      };
    }

    default:
      return state;
  }
};
