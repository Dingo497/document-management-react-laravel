import {InitialStateAuthType} from "./authTypes";
import {DocumentsType} from "./documentTypes";

// Stav celej aplikacie
export type AppStateTypes = {
    auth: InitialStateAuthType,
    tag: TagsType,
    document: DocumentsType
}

export type ButtonPropsType = {
    documentID: string;
    type: 'edit' | 'download' | 'remove';
}

export type TagType = {
    id: string | null;
    name: string | null;
}
export type TagsType = {
    tags: TagType[]
}

export type alertDataType = {
    type: 'danger' | 'success',
    title: string,
    messages: [],
}
