import { ACTION_TYPE } from "./type";

export const setProducts = ({products,lastPage,currentPage}) => ({
  type: ACTION_TYPE.SET_PRODUCTS,
  payload: {products,lastPage,currentPage},
});
