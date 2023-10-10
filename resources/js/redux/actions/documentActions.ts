import { ActionTypes } from "../constants/actionTypes";
import {ApiToken} from "../../types/auth/authTypes";
import {createUserDocument, editUserDocument, getUserDocuments, removeUserDocument} from "../../http/documentApi";
import {Document, EditDocumentType, NewDocumentType} from "../constants/appStateTypes";

export const getUserDocumentsAction = (token: ApiToken) => {
    return async (dispatch) => {
        try {
            const { data } = await getUserDocuments(token);
            if (data.status === 'success' && data.data.documents.length > 0) {
                return dispatch(setUserDocumentsAction(data.data.documents));
            }
        } catch (error) {
            // nedokoncene zobrazenie chyby
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
            return error.response.data;
        }
    }
}

export const editUserDocumentAction = (token: ApiToken, documents/*: EditDocumentType*/) => {
    return async (dispatch) => {
        try {
            const { data } = await editUserDocument(token, documents);
            if (data.status === 'success' && data.data.documents) {
                return dispatch(editUserDocumentsAction(data.data.documents));
            }
        } catch (error) {
            return error.response.data;
        }
    }
}

export const setUserDocumentsAction = (document: NewDocumentType | Document[]) => {
    return {
        type: ActionTypes.SET_DOCUMENTS,
        documents: document
    };
}

export const editUserDocumentsAction = (updatedDocument: EditDocumentType) => {
    return {
        type: ActionTypes.EDIT_DOCUMENT,
        updatedDocument: updatedDocument
    };
}

export const removeUserDocumentAction = (token: ApiToken, documentID: number) => {
    return async (dispatch) => {
        try {
            const { data } = await removeUserDocument(token, documentID);
            if (data.status === 'success') {
                return dispatch({
                    type: ActionTypes.REMOVE_DOCUMENT,
                    documentID: documentID
                });
            }
        } catch (error) {
            // nedokoncene zobrazenie chyby
            return console.log(error.response.data);
        }
    }
}
