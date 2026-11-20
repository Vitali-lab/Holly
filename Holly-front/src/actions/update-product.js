import { ACTION_TYPE } from "./type";
export const updateProduct = (id ,updatedProduct) => ({
  type: ACTION_TYPE.UPDATE_PRODUCT,
  payload: {  id, updatedProduct },
});
