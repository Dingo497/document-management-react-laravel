import { DocumentsInitialState } from "../constants/initialState";
import { ActionTypes } from "../constants/actionTypes";

const documentReducer = (state = DocumentsInitialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_DOCUMENTS:
            return {
                ...state,
                documents: action.documents
            };
        case ActionTypes.REMOVE_DOCUMENT:
            const updatedDocuments = state.documents.filter(doc => doc.id !== action.documentID);
            return {
                documents: updatedDocuments
            }
        default:
            return state;
    }
};

export default documentReducer;
