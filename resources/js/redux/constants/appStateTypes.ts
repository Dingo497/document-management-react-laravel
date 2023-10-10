import {ApiStatusResponse, ApiToken, User} from "../../types/auth/authTypes";

// Stav celej aplikacie
export type AppStateTypes = {
    auth: InitialStateAuthType,
    tag: TagsType,
    document: Documents
}

export type TagType = {
    id: string | null;
    name: string | null;
}
export type TagsType = {
    tags: TagType[]
}

export type Document = {
    id: string | null;
    name: string | null;
    image: string | null;
    tags: TagType[]
}
export type Documents = {
    documents: Document[]
}
export type NewDocumentType = {
    name: string | null;
    tags: number[]
}
export type EditDocumentType = {
    id: string;
    name: string;
    tags: number[];
}
export type ApiDocumentSuccessResponse = ApiStatusResponse & ApiToken & {
    data: {
        documents: Document[],
    }
}
export type ApiCreateDocumentSuccessResponse = ApiStatusResponse & ApiToken & {
    data: {
        documents: NewDocumentType,
    }
}
export type ApiEditDocumentSuccessResponse = ApiStatusResponse & ApiToken & {
    data: {
        documents: EditDocumentType,
    }
}

export type alertDataType = {
    type: 'danger' | 'success',
    title: string,
    messages: [],
}

// Stav Auth casti aplikacie
export type InitialStateAuthType = {
    user: User | null;
    token: string | null;
}

