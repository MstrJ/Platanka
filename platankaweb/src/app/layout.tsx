import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers/provider";
import { ThemeSwitch } from "./components/ThemeSwitcher";
import Navbar from "./components/Navbar/page";
import Head from "next/head";
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
        <Providers themeProps={{ defaultTheme: "dark" }}>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
