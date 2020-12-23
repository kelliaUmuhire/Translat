import * as actionTypes from "../actionTypes";
import { isEmpty } from "lodash";

const inititalState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  profile: {},
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        profile: { ...state.profile },
      };
    case actionTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case actionTypes.GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        profile: { ...state.profile },
      };

    case actionTypes.LOG_OUT:
      return {
        state: {},
      };
    default:
      return state;
  }
};

export default reducer;
