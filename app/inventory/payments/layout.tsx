import { PaymentStoreProvider } from "@/lib/providers/payment-store-provider";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (<PaymentStoreProvider>
        {children}
    </PaymentStoreProvider>);
}