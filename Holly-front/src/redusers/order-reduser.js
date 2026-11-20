import { ACTION_TYPE } from "../actions/type";

const initialAppState = {
  order: [],
  userOrders: [],
};

export const orderReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.CREATE_ORDER: {
      return { ...state, order: action.payload };
    }
    case ACTION_TYPE.SET_USER_ORDERS: {
      return { ...state, userOrders: action.payload };
    }
    case ACTION_TYPE.SET_ORDERS: {
      return { ...state, orders: action.payload };
    }

    default:
      return state;
  }
};
