import { InitialStateAuthType } from "../../types/authTypes";
import { TagsType } from '../../types/globalTypes';
import { DocumentsType } from '../../types/documentTypes';

export const AuthInitialState: InitialStateAuthType = {
    user: null,
    token: null,
};

export const TagsInitialState: TagsType = {
    tags: [
        {
            id: null,
            name: null,
        }
    ]
};

export const DocumentsInitialState: DocumentsType = {
    documents: [
        {
            id: null,
            name: null,
            image: null,
            tags: []
        }
    ]
}
