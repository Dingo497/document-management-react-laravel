// Stav Auth casti aplikacie
export type InitialStateAuthType = {
    user: User | null;
    token: string | null;
}

export type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
}
// Sluzi na typovanie redux action setUserAction
export type setUserActionType = {
    user: User;
    token: string;
}


// -----------------------------Formulare---------------------------
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


// -----------------------------API-----------------------------------
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
