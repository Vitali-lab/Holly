import { ACTION_TYPE } from "../actions/type";

export const setFilters = (filters) => ({
  type: ACTION_TYPE.SET_FILTERS,
  payload: filters,
});