import { GoodStoreProvider } from "@/lib/providers/good-store-provider";
import { ReactNode } from "react";

export default function InventoryProviders({children} : {children: ReactNode}) {
    return (
        <GoodStoreProvider>
            {children}
        </GoodStoreProvider>
    )
}