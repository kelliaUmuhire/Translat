import { isEmpty } from 'lodash';
import * as actionTypes from '../actionTypes';

const initialState = {
    isAuthenticated: false,
    user: {}
}
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
          return {
            state
          }
    }
}

export default authReducer;
