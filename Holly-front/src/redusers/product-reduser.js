import { ACTION_TYPE } from "../actions/type";

const initialAppState = {
  product: {},
};

export const productReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCT: {
      return { ...state, product: action.payload };
    }

    case ACTION_TYPE.ADD_RATING: {
      return {
        ...state,
        product: { ...state.product, rating: action.payload },
      };
    }

    default:
      return state;
  }
};
