import { ACTION_TYPE } from "./type";
export const addCategory = (category) => ({
  type: ACTION_TYPE.ADD_CATEGORY,
  payload: category,
});
