import {AxiosResponse} from "axios";
import {backendAPI} from "./index";
import {ApiToken} from "../types/auth/authTypes";
import {
    ApiCreateDocumentSuccessResponse,
    ApiDocumentSuccessResponse,
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
        'content-type': 'multipart/form-data',
    },
});
