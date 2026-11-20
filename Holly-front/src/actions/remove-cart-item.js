import { ACTION_TYPE } from "./type";
export const removeCartItem = (id) => ({
  type: ACTION_TYPE.REMOVE_CARD,
  payload: id,
});
