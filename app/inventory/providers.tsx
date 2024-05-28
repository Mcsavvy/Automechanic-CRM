import { BuyerStoreProvider } from "@/lib/providers/buyer-provider";
import { GoodStoreProvider } from "@/lib/providers/good-store-provider";
import { ReactNode } from "react";

export default function InventoryProviders({children} : {children: ReactNode}) {
    return (
        <GoodStoreProvider>
            <BuyerStoreProvider>
                {children}
            </BuyerStoreProvider>
        </GoodStoreProvider>
    )
}