import { ACTION_TYPE } from "./type";
export const removeProduct = (productId) => ({
  type: ACTION_TYPE.REMOVE_PRODUCT,
  payload: productId,
});
