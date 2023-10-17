import { ActionTypes } from "../constants/actionTypes";
import {ApiToken} from "../../types/auth/authTypes";
import {
    createUserDocument,
    editUserDocument,
    getDocumentsPagination,
    getUserDocuments, getUserDocumentsAfterRefresh,
    removeUserDocument
} from "../../http/documentApi";
import {Document, EditDocumentType, NewDocumentType} from "../constants/appStateTypes";
import { setUserAction } from './authActions';

export const getUserDocumentsAction = (token: ApiToken, page: number = 1) => {
    return async (dispatch) => {
        try {
            const { data } = await getUserDocuments(token, page);
            if (data.status === 'success' && data.data.documents.length > 0) {
                return dispatch(setUserDocumentsAction(data.data.documents));
            }
        } catch (error) {
            // nedokoncene zobrazenie chyby
            return console.log(error.response.data);
        }
    }
}

export const getUserDocumentsAfterRefreshAction = (page: number = 1) => {
    return async (dispatch) => {
        try {
            const { data } = await getUserDocumentsAfterRefresh(page);
            if (
                data.status === 'success'
                &&
                data.data.documents.length > 0
                &&
                data.token.length > 0
            ) {
                dispatch(setUserAction({user: data.data.user, token: data.token}));
                return dispatch(setUserDocumentsAction(data.data.documents));
            }
        } catch (error) {
            // nedokoncene zobrazenie chyby
            return console.log(error.response.data);
        }
    }
}

export const getDocumentsPaginationAction = (token: ApiToken) => {
    return async (dispatch) => {
        try {
            const { data } = await getDocumentsPagination(token);
            if (data.status === 'success' && data.data.documentsPagination > 0) {
                return dispatch(setDocumentsPagination(data.data.documentsPagination));
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

export const setDocumentsPagination = (documentsPagination: number) => {
    return {
        type: ActionTypes.SET_DOCUMENTS_PAGINATION,
        documentsPagination: documentsPagination
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

export const logoutDocumentsAction = () => {
    return {
        type: 'LOGOUT_DOCUMENTS',
    };
}
