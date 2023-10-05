import { ActionTypes } from "../constants/actionTypes";
import {ApiToken} from "../../types/auth/authTypes";
import {createUserDocument, getUserDocuments} from "../../http/documentApi";
import {Document, NewDocumentType} from "../constants/appStateTypes";

export const getUserDocumentsAction = (token: ApiToken) => {
    return async (dispatch) => {
        try {
            const { data } = await getUserDocuments(token);
            if (data.status === 'success' && data.data.documents.length > 0) {
                return dispatch(setUserDocumentsAction(data.data.documents));
            }
        } catch (error) {
            // TODO: spravit nejake zobrazovanie chyb
            return console.log(error.response.data);
        }
    }
}

export const createUserDocumentAction = (token: ApiToken, documents: NewDocumentType) => {
    return async (dispatch) => {
        try {
            const { data } = await createUserDocument(token, documents);
            if (data.status === 'success' && data.data.documents) {
                return dispatch(setUserDocumentsAction(data.data.documents));
            }
        } catch (error) {
            // TODO: spravit nejake zobrazovanie chyb
            return console.log(error.response.data);
        }
    }
}

export const setUserDocumentsAction = (document: NewDocumentType | Document[]) => {
    return {
        type: ActionTypes.SET_DOCUMENTS,
        documents: document
    };
}
