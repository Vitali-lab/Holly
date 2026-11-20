import { ACTION_TYPE } from "../actions/type";

const initialAppState = {
  seasons: [],
};

export const seasonReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_SEASONS: {
      return { ...state, seasons: action.payload };
    }
    case ACTION_TYPE.ADD_SEASON: {
      return { ...state, seasons: [...state.seasons, action.payload] };
    }
    case ACTION_TYPE.REMOVE_SEASON: {
      return {
        ...state,
        seasons: state.seasons.filter(
          (season) => season.id !== action.payload.id,
        ),
      };
    }

    default:
      return state;
  }
};
