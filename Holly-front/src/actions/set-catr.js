import { ACTION_TYPE } from "./type";

export const setCart = (products) => ({
  type: ACTION_TYPE.SET_CART,
  payload: products,
});
