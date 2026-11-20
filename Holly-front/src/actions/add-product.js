import { ACTION_TYPE } from "./type";
export const addProduct = (product) => ({
  type: ACTION_TYPE.ADD_PRODUCT,
  payload: product,
});
