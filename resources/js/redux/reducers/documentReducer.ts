import { DocumentsInitialState } from "../constants/initialState";
import { ActionTypes } from "../constants/actionTypes";

const documentReducer = (state = DocumentsInitialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_DOCUMENTS:
            return {
                ...state,
                documents: action.documents
            };
        case ActionTypes.SET_DOCUMENTS_PAGINATION:
            return {
                ...state,
                documentsPagination: action.documentsPagination
            }
        case ActionTypes.REMOVE_DOCUMENT:
            const updatedDocuments = state.documents.filter(doc => doc.id !== action.documentID);
            return {
                documents: updatedDocuments
            }
        case ActionTypes.EDIT_DOCUMENT:
            const updatedDocument = action.updatedDocument;
            // @ts-ignore
            const documentIndex = state.documents.findIndex(doc => doc.id === updatedDocument.id);
            const documents = [...state.documents];
            if (documentIndex !== -1) {
                documents[documentIndex] = updatedDocument;
            }
            return {
                ...state,
                documents: documents
            };
        case ActionTypes.LOGOUT_DOCUMENTS:
            return DocumentsInitialState;
        default:
            return state;
    }
};

export default documentReducer;
