import { ACTION_TYPE } from "./type";
export const setSeasons = (seasons) => ({
  type: ACTION_TYPE.SET_SEASONS,
  payload: seasons,
});
