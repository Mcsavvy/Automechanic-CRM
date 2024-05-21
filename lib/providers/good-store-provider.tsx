'use client';
import { type ReactNode, createContext, useRef, useContext, useState, useEffect } from "react";
import { type StoreApi, useStore } from "zustand";
import { type GoodStore, type GoodState, createGoodStore, defaultGoodState, getGoods } from "../stores/good-store";

export const GoodStoreContext = createContext<StoreApi<GoodStore> | null>(null);

export function GoodStoreProvider({ children }: { children: ReactNode }) {
    const store = useRef<StoreApi<GoodStore>>(createGoodStore(defaultGoodState));
    const storeStatus = useRef("idle");
    

    useEffect(() => {
        const limit = localStorage.getItem("limit")  as number | null || 10;
        const page = 1;
        if (storeStatus.current == "idle") {
            storeStatus.current = "loading";
            getGoods(page, limit).then((state) => {
                store.current.setState(state);
                storeStatus.current = "ready";
            });
        }
    }, []);

    return <GoodStoreContext.Provider value={store.current}>{children}</GoodStoreContext.Provider>;
}

export function useGoodStore<T>(selector: (store: GoodStore) => T): T {
    const store = useContext(GoodStoreContext);
    if (!store) {
        throw new Error("useGoodStore must be used within an GoodStoreProvider");
    }
    return useStore(store, selector);
}