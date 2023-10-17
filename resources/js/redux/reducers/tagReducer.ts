import {TagsInitialState} from "../constants/initialState";
import { ActionTypes } from "../constants/actionTypes";

const tagReducer = (state = TagsInitialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_TAGS:
            return {
                ...state,
                tags: action.tags
            };
        case ActionTypes.LOGOUT_TAGS:
            return TagsInitialState;
        default:
            return state;
    }
};

export default tagReducer;
