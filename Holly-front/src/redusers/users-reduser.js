import { ACTION_TYPE } from "../actions/type";
const initialAppState = {
  user: null,
};

export const usersReduser = (state = initialAppState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USERS: {
      return { ...state, users: action.payload };
    }

    default:
      return state;
  }
};
