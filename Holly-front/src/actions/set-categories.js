import { ACTION_TYPE } from "./type";
export const setCategories = (categories) => ({
  type: ACTION_TYPE.SET_CATEGORIES,
  payload: categories,
});
