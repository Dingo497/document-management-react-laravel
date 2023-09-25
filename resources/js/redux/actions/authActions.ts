import {ActionTypes} from "../constants/actionTypes";

export const setUser = (user: string) => {
    return {
        type: ActionTypes.SET_USER,
        payload: user
    };
};
