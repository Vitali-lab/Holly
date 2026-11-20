import { ACTION_TYPE } from "./type";
export const updateCartItemCount = (id, count) => ({
  type: ACTION_TYPE.UPDATE_CART_ITEM_COUNT,
  payload: { id, count },
});
