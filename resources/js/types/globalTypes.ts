import {InitialStateAuthType} from "./authTypes";
import {Documents} from "./documentTypes";

// Stav celej aplikacie
export type AppStateTypes = {
    auth: InitialStateAuthType,
    tag: TagsType,
    document: Documents
}

export type ButtonProps = {
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
