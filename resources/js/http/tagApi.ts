import {AxiosResponse} from "axios";
import {backendAPI} from "./index";
import {ApiToken} from "../types/authTypes";

export const getUserTags =  (token: ApiToken): Promise<AxiosResponse> => backendAPI.get('tags', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
