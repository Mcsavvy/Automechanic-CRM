import { BuyerStoreProvider } from "@/lib/providers/buyer-provider";
import { GoodStoreProvider } from "@/lib/providers/good-store-provider";
import { OrderStoreProvider } from "@/lib/providers/order-store-provider";
import { StaffStoreProvider } from "@/lib/providers/staff-store-provider";
import { ReactNode } from "react";

export default function InventoryProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <GoodStoreProvider>
      <BuyerStoreProvider>
        <StaffStoreProvider>
          <OrderStoreProvider>{children}</OrderStoreProvider>
        </StaffStoreProvider>
      </BuyerStoreProvider>
    </GoodStoreProvider>
  );
}
