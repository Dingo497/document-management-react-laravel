import { initialState } from "../constants/initialState";
import { ActionTypes } from "../constants/actionTypes";

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
                token: action.token,
            };
        // docasne
        // case ActionTypes.LOGOUT:
        //     return {
        //         ...state,
        //         user: null,
        //         token: null,
        //     };
        default:
            return state;
    }
};

export default authReducer;
