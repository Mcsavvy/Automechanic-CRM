'use client';
import { type ReactNode, createContext, useRef, useContext, useState, useEffect } from "react";
import { type StoreApi, useStore } from "zustand";
import { type AuthStore, type AuthState, createAuthStore, defaultAuthState } from "@/lib/stores/auth-store";
import { Cookies } from "react-cookie";
import axios from "axios";

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);


export async function getAuthState(): Promise<AuthState> {
    const cookieJar = new Cookies();
    const accessToken: string | undefined = cookieJar.get("accessToken");
    if (!accessToken) {
        return defaultAuthState;
    }
    try {
        const response = await axios.post("/api/auth/me");
        if (response.status !== 200) {
            throw response;
        }
        return {
            loggedIn: true,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            id: response.data.id,
        }
    } catch (error) {
        return defaultAuthState;
    }
}



export function AuthStoreProvider({ children }: { children: ReactNode }) {
    const store = useRef<StoreApi<AuthStore>>(createAuthStore(defaultAuthState));
    const storeLoaded = useRef(false);
    const cookieJar = new Cookies();

    if (!storeLoaded.current) {
        getAuthState().then((state) => {
            store.current.setState(state);
            storeLoaded.current = true;
        });
    }

    cookieJar.addChangeListener(() => {
        getAuthState().then((state) => {
            store.current.setState(state);
        });
    });

    return <AuthStoreContext.Provider value={store.current}>{children}</AuthStoreContext.Provider>;
}


export function useAuthStore<T>(selector: (store: AuthStore) => T): T {
    const store = useContext(AuthStoreContext);
    if (!store) {
        throw new Error("useAuthStore must be used within an AuthStoreProvider");
    }
    return useStore(store, selector);
}