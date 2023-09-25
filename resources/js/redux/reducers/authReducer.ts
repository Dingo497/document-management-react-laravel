import {ActionTypes} from "../constants/actionTypes";
import {initialState} from "../constants/initialState";

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;
