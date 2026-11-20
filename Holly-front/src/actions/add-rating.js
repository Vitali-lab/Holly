
import { ACTION_TYPE } from "./type";
export const addRating = (newRating) => ({
  type: ACTION_TYPE.ADD_RATING,
  payload: newRating,
});
