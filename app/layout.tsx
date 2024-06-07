import type { Metadata, Viewport } from "next";
import { Inter, Rambla, Quicksand, Lato } from "next/font/google";
import "./globals.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthStoreProvider } from "@/lib/providers/auth-store-provider";

const inter = Inter({ subsets: ["latin"] });
const rambla = Rambla({ subsets: ["latin"], weight: ["400", "700"]});
const quicksand = Quicksand({ subsets: ["latin"] });
const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700", "900"] });

export const metadata: Metadata = {
  title: "Synergy Corps",
  description: "Your one stop CRM application. Tailor made and designed for your auto repairs and auto parts sales businesses",
}
export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: "cover"
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} safe-container`}>
        <ToastContainer position="top-center" hideProgressBar />
        <AuthStoreProvider>
          {children}
        </AuthStoreProvider>
      </body>
    </html>
  );
}
