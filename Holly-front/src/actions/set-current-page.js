import { ACTION_TYPE } from "./type";

export const setCurrentPage = (num) => ({
  type: ACTION_TYPE.SET_CURRENT_PAGE,
  payload: num,
});