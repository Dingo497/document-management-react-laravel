import {AxiosResponse} from "axios";
import {backendAPI} from "./index";
import {ApiStatusResponse, ApiToken} from "../types/authTypes";
import {
    ApiCreateDocumentSuccessResponse, ApiDocumentPaginationSuccessResponse,
    ApiDocumentSuccessResponse, ApiDocumentWithUserSuccessResponse, ApiEditDocumentSuccessResponse
} from "../types/documentTypes";
import {EditDocumentType, NewDocumentType} from "../types/documentTypes";

export const getUserDocuments =  (token: ApiToken, page: number): Promise<AxiosResponse<ApiDocumentSuccessResponse>> => backendAPI.get('documents?page=' + page, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

/**
 * Ziskanie dokumentov patraice pouzivatelovi bez bearer token ale zato mam nastavene cookie.
 * Pouziva sa ked sa spravi refresh stranky
 * @param page
 */
export const getUserDocumentsAfterRefresh =  (page: number): Promise<AxiosResponse<ApiDocumentWithUserSuccessResponse>> => backendAPI.get('documents-cookie?page=' + page);

export const getDocumentsPagination = (token: ApiToken): Promise<AxiosResponse<ApiDocumentPaginationSuccessResponse>> => backendAPI.get('documents/documents-pagination', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const createUserDocument = (token: ApiToken, document: NewDocumentType): Promise<AxiosResponse<ApiCreateDocumentSuccessResponse>> => backendAPI.post('documents', document, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data',
    },
});

export const editUserDocument = (token: ApiToken, document: EditDocumentType): Promise<AxiosResponse<ApiEditDocumentSuccessResponse>> => backendAPI.post('documents/' + document.id, document, {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'multipart/form-data',
    },
});

export const removeUserDocument =  (token: ApiToken, documentID: number): Promise<AxiosResponse<ApiStatusResponse>> => backendAPI.delete('documents/' + documentID, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const downloadUserDocument = (token: ApiToken, documentFileUrl: string): Promise<AxiosResponse> => backendAPI.get('documents/download/' + documentFileUrl,{
    headers: {
        Authorization: `Bearer ${token}`,
        responseType: 'blob',
    },
});
