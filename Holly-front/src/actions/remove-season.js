import { ACTION_TYPE } from "./type";
export const removeSeason = (season) => ({
  type: ACTION_TYPE.REMOVE_SEASON,
  payload: season,
});
