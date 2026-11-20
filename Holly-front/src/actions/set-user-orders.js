import { ACTION_TYPE } from "./type";

export const setUserOrders = (orders) => ({
  type: ACTION_TYPE.SET_USER_ORDERS,
  payload: orders,
});
