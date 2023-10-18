import {AxiosResponse} from "axios";
import {backendAPI} from "./index";
import {ApiStatusResponseType, ApiTokenType} from "../types/authTypes";
import {
    ApiCreateDocumentSuccessResponseType, ApiDocumentPaginationSuccessResponseType,
    ApiDocumentSuccessResponseType, ApiDocumentWithUserSuccessResponseType, ApiEditDocumentSuccessResponseType
} from "../types/documentTypes";
import {EditDocumentType, NewDocumentType} from "../types/documentTypes";

export const getUserDocuments =  (token: ApiTokenType, page: number): Promise<AxiosResponse<ApiDocumentSuccessResponseType>> => backendAPI.get('documents?page=' + page, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

/**
 * Ziskanie dokumentov patraice pouzivatelovi bez bearer token ale zato mam nastavene cookie.
 * Pouziva sa ked sa spravi refresh stranky
 * @param page
 */
export const getUserDocumentsAfterRefresh =  (page: number): Promise<AxiosResponse<ApiDocumentWithUserSuccessResponseType>> => backendAPI.get('documents-cookie?page=' + page);

export const getDocumentsPagination = (token: ApiTokenType): Promise<AxiosResponse<ApiDocumentPaginationSuccessResponseType>> => backendAPI.get('documents/documents-pagination', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const createUserDocument = (token: ApiTokenType, document: NewDocumentType): Promise<AxiosResponse<ApiCreateDocumentSuccessResponseType>> => backendAPI.post('documents', document, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data',
    },
});

export const editUserDocument = (token: ApiTokenType, document: EditDocumentType): Promise<AxiosResponse<ApiEditDocumentSuccessResponseType>> => backendAPI.post('documents/' + document.id, document, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data',
    },
});

export const removeUserDocument =  (token: ApiTokenType, documentID: number): Promise<AxiosResponse<ApiStatusResponseType>> => backendAPI.delete('documents/' + documentID, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const downloadUserDocument = (token: ApiTokenType, documentFileUrl: string): Promise<AxiosResponse> => backendAPI.get('documents/download/' + documentFileUrl,{
    headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/pdf'
    },
    responseType: 'blob',
});
