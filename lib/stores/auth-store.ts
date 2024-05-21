import {create} from 'zustand';
import { createStore } from "zustand/vanilla";

export type AuthState = 
{
    id: string;
    email?: string;
    firstName: string;
    lastName: string;
    loggedIn: true;
    phone: string;
} | {
    id: null;
    email: null;
    firstName: null;
    lastName: null;
    loggedIn: false | null;
    phone: null;
}

export interface AuthActions {
    setAuth: (auth: AuthState) => void;
    clearAuth: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const defaultAuthState: AuthState = {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    loggedIn: null,
    phone: null
};


export const createAuthStore = (state: AuthState) => {
    return createStore<AuthStore>((set) => ({
        ...state,
        setAuth: (auth: AuthState) => set(auth),
        clearAuth: () => set(defaultAuthState),
    }));
}
