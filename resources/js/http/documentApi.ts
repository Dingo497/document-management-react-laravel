import {AxiosResponse} from "axios";
import {backendAPI} from "./index";
import {ApiStatusResponse, ApiToken} from "../types/auth/authTypes";
import {
    ApiCreateDocumentSuccessResponse,
    ApiDocumentSuccessResponse, ApiEditDocumentSuccessResponse, EditDocumentType,
    NewDocumentType
} from "../redux/constants/appStateTypes";

export const getUserDocuments =  (token: ApiToken): Promise<AxiosResponse<ApiDocumentSuccessResponse>> => backendAPI.get('documents', {
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
