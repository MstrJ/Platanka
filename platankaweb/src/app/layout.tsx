import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers/provider";
import Navbar from "./components/Navbar/page";
import AuthProvider from "./providers/auth-provider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
fontAwesomeConfig.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "PlatAnka",
  description: "Platanka",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Providers themeProps={{ defaultTheme: "dark" }}>
            <Navbar />
            <main>{children}</main>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
