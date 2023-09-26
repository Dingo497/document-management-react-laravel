import { User } from "../../types/auth/authTypes";

// Stav celej aplikacie
export type AppStateTypes = {
    auth: InitialStateAuthType
}

// Stav Auth casti aplikacie
export type InitialStateAuthType = {
    user: User | null;
    token: string | null;
}

