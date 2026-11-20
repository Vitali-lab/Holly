import { ACTION_TYPE } from "./type";
export const removeCategory = (categoryId) => ({
  type: ACTION_TYPE.REMOVE_CATEGORY,
  payload: categoryId,
});
