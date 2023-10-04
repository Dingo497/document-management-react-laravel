import { AuthInitialState } from "../constants/initialState";
import { ActionTypes } from "../constants/actionTypes";

const authReducer = (state = AuthInitialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
                token: action.token,
            };
        case ActionTypes.LOGOUT:
            return {
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export default authReducer;
