const initialAppState = {
  cart: [],
};

export const appReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};
