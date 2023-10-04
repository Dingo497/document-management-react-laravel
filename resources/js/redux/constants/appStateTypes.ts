import { User } from "../../types/auth/authTypes";

// Stav celej aplikacie
export type AppStateTypes = {
    auth: InitialStateAuthType,
    tag: Tags
}

export type Tag = {
    id: string | null;
    name: string | null;
}

export type Tags = {
    tags: Tag[]
}

// Stav Auth casti aplikacie
export type InitialStateAuthType = {
    user: User | null;
    token: string | null;
}

