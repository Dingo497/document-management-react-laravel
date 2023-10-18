import { getUserTags } from "../../http/tagApi";
import { ActionTypes } from "../constants/actionTypes";
import { ApiTokenType } from "../../types/authTypes";
export const getUserTagsAction = (token: ApiTokenType) => {
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

export const logoutTagsAction = () => {
    return {
        type: 'LOGOUT_TAGS',
    };
}
