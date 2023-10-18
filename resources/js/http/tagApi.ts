import {AxiosResponse} from "axios";
import {backendAPI} from "./index";
import {ApiTokenType} from "../types/authTypes";

export const getUserTags =  (token: ApiTokenType): Promise<AxiosResponse> => backendAPI.get('tags', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
