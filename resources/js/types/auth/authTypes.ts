export type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
}


// Sluzi na spracovanie formulara
export type AuthLoginForm = {
    email: string;
    password: string;
}
// Sluzi na spracovanie register formulara
export type AuthRegisterForm = AuthLoginForm & {
    name: string;
    password: string;
    password_confirmation: string;
}


// TS mi nejde teda... Opakujem token: string...
// Sluzi na typovanie redux action setUserAction
export type setUserActionType = {
    user: User;
    token: string;
}


// Sluzi na identifikovanie viac formularovych chyb
export type ApiAuthErrorFields = {
    [key: string]: string[];
}
// Zjednotenie formularovych chyb pod errors
export type ApiAuthErrorsResponse = {
    errors: ApiAuthErrorFields
}
// Ziskanie statusu uspesneho requestu alebo nie
export type ApiStatusResponse = {
    status: 'success' | 'error';
    message?: string;
}
export type ApiToken = {
    token: string;
}
export type ApiAuthSuccessResponse = ApiStatusResponse & ApiToken & {
    data: {
        user: User,
    }
}
export type ApiGetUserResponse = ApiStatusResponse & {
    data: {
        user: User,
    }
}
// Jednotny response typ pre auth operacie
// TODO: tento mi je asi nanic kedze union typy mi akosi IDE nechape...
// export type ApiAuthResponse = ApiAuthSuccessResponse | ApiAuthErrorsResponse;

