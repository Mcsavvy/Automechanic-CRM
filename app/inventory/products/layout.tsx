import { GoodStoreProvider } from "@/lib/providers/good-store-provider";

export default function OverviewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GoodStoreProvider>
            {children}
        </GoodStoreProvider>
    );
}
