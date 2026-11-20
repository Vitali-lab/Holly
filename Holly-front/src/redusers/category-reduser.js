import { ACTION_TYPE } from "../actions/type";

const initialAppState = {
  categories: [],
};

export const categoryReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    case ACTION_TYPE.ADD_CATEGORY: {
      return { ...state, categories: [...state.categories, action.payload] };
    }
    case ACTION_TYPE.REMOVE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload.id,
        ),
      };
    }

    default:
      return state;
  }
};
