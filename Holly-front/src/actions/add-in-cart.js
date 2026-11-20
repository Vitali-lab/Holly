import { ACTION_TYPE } from "./type";
export const addInCart = (cartItem) => ({
  type: ACTION_TYPE.ADD_CARD,
  payload: cartItem ,
});
