import { ACTION_TYPE } from "./type";
export const createOrder = (orderNum, user, products) => ({
  type: ACTION_TYPE.CREATE_ORDER,
  payload: { orderNum, user, products },
});
