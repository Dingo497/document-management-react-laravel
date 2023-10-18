import {TagType} from "./globalTypes";
import {ApiStatusResponse, ApiToken, User} from "./authTypes";

export type documentFormDataType = {
    name: string,
    tags: number[],
    image: File | null
}
export type Document = {
    id: string | null;
    name: string | null;
    image: string | null;
    tags: TagType[]
}
export type Documents = {
    documents: Document[]
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
export type ApiDocumentSuccessResponse = ApiStatusResponse & ApiToken & {
    data: {
        documents: Document[],
    }
}
export type ApiDocumentWithUserSuccessResponse = ApiStatusResponse & ApiToken & {
    data: {
        documents: Document[],
        user: User
    }
}
export type ApiDocumentPaginationSuccessResponse = ApiStatusResponse & ApiToken & {
    data: {
        documentsPagination: number,
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
