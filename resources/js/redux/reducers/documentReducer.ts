import { DocumentsInitialState } from "../constants/initialState";
import { ActionTypes } from "../constants/actionTypes";

const documentReducer = (state = DocumentsInitialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_DOCUMENTS:
            return {
                ...state,
                documents: action.documents
            };
        default:
            return state;
    }
};

export default documentReducer;
