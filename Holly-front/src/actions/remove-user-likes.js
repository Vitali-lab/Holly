import { ACTION_TYPE } from "./type";
export const removeUserLikes = (product) => ({
  type: ACTION_TYPE.REMOVE_USER_LIKES,
  payload: product,
});
