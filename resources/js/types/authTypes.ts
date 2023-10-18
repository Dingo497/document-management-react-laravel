// Stav Auth casti aplikacie
export type InitialStateAuthType = {
    user: UserType | null;
    token: string | null;
}

export type UserType = {
    id: number;
    name: string;
    email: string;
    created_at: string;
}
// Sluzi na typovanie redux action setUserAction
export type setUserActionType = {
    user: UserType;
    token: string;
}


// -----------------------------Formulare---------------------------
// Sluzi na spracovanie formulara
export type AuthLoginFormType = {
    email: string;
    password: string;
}
// Sluzi na spracovanie register formulara
export type AuthRegisterFormType = AuthLoginFormType & {
    name: string;
    password: string;
    password_confirmation: string;
}


// -----------------------------API-----------------------------------
// Ziskanie statusu uspesneho requestu alebo nie
export type ApiStatusResponseType = {
    status: 'success' | 'error';
    message?: string;
}
export type ApiTokenType = {
    token: string;
}
export type ApiAuthSuccessResponseType = ApiStatusResponseType & ApiTokenType & {
    data: {
        user: UserType,
    }
}
export type ApiGetUserResponseType = ApiStatusResponseType & {
    data: {
        user: UserType,
    }
}
