import { StaffStoreProvider } from "@/lib/providers/staff-store-provider";

export default function OverviewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StaffStoreProvider>
            {children}
        </StaffStoreProvider>
    );
}
