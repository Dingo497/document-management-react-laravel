import { ActionTypes } from "../constants/actionTypes";
import {getUserTags} from "../../http/tagApi";
import {ApiToken} from "../../types/auth/authTypes";
export const getUserTagsAction = (token: ApiToken) => {
    return async (dispatch) => {
        try {
            const { data } = await getUserTags(token);
            if (data.status === 'success' && data.data.tags.length > 0) {
                return dispatch(setUserTagsAction(data.data.tags));
            }
        } catch (error) {
            // TODO: spravit nejake zobrazovanie chyb
            return console.log(error.response.data);
        }
    }
}

export const setUserTagsAction = (tagData: any) => {
    return {
        type: ActionTypes.SET_TAGS,
        tags: tagData
    };
}