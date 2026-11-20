import { ACTION_TYPE } from "../actions/type";
const initialAppState = {
  currentUser: null,
};

export const userReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER: {
      return { ...state, currentUser: action.payload };
    }
    case "LOGOUT": {
      return { ...state, currentUser: null };
    }
    case ACTION_TYPE.ADD_USER_LIKES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favorites: [...state.currentUser.favorites, action.payload],
        },
      };
    }
    case ACTION_TYPE.REMOVE_USER_LIKES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favorites: state.currentUser.favorites.filter(
            (fav) => fav.id !== action.payload,
          ),
        },
      };
    }
    case ACTION_TYPE.ADD_CARD: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          cart: [...state.currentUser.cart, action.payload],
        },
      };
    }
    case ACTION_TYPE.REMOVE_CARD: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          cart: state.currentUser.cart.filter(
            (item) => item.customId !== action.payload,
          ),
        },
      };
    }
    case ACTION_TYPE.UPDATE_CART_ITEM_COUNT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          cart: state.currentUser.cart.map((item) =>
            item.customId === action.payload.id
              ? { ...item, count: action.payload.count }
              : item,
          ),
        },
      };
    }
    case ACTION_TYPE.CLEAR_CART: {
      return { ...state, currentUser: { ...state.currentUser, cart: [] } };
    }

    default:
      return state;
  }
};
