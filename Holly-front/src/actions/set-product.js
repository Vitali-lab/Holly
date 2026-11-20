import { ACTION_TYPE } from "./type";

export const setProduct = (product) => ({
  type: ACTION_TYPE.SET_PRODUCT,
  payload: product,
});
