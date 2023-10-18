import {TagType} from "./globalTypes";
import {ApiStatusResponseType, ApiTokenType, UserType} from "./authTypes";

export type documentFormDataType = {
    name: string,
    tags: number[],
    image: File | null
}
export type DocumentType = {
    id: string | null;
    name: string | null;
    image: string | null;
    tags: TagType[]
}
export type DocumentsType = {
    documents: DocumentType[]
    documentsPagination?: number | null
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


//------------------------------API----------------------------------
export type ApiDocumentSuccessResponseType = ApiStatusResponseType & ApiTokenType & {
    data: {
        documents: DocumentType[],
    }
}
export type ApiDocumentWithUserSuccessResponseType = ApiStatusResponseType & ApiTokenType & {
    data: {
        documents: DocumentType[],
        user: UserType
    }
}
export type ApiDocumentPaginationSuccessResponseType = ApiStatusResponseType & ApiTokenType & {
    data: {
        documentsPagination: number,
    }
}
export type ApiCreateDocumentSuccessResponseType = ApiStatusResponseType & ApiTokenType & {
    data: {
        documents: NewDocumentType,
    }
}
export type ApiEditDocumentSuccessResponseType = ApiStatusResponseType & ApiTokenType & {
    data: {
        documents: EditDocumentType,
    }
}
