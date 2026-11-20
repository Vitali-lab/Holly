import { ACTION_TYPE } from "./type";
export const addSeason = (season) => ({
  type: ACTION_TYPE.ADD_SEASON,
  payload: season,
});
