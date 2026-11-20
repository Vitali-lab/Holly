import { ACTION_TYPE } from "./type";
export const addUserLikes = (product) => ({
  type: ACTION_TYPE.ADD_USER_LIKES,
  payload: product,
});
