import * as actionTypes from "../actionTypes";
import { isEmpty } from "lodash";

const inititalState = {
  isAuthenticated: false,
  user: {},
  errors: {},
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case actionTypes.GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
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
