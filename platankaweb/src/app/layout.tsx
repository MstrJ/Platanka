import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers/NextUIProvider";
import Navbar from "./components/Navbar/page";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as fontAwesomeConfig } from "@fortawesome/fontawesome-svg-core";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import NextAuthProvider from "./providers/NextAuthProvider";
fontAwesomeConfig.autoAddCss = false;

export const metadata: Metadata = {
  title: "PlatAnka",
  description: "Platanka",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextAuthProvider session={session}>
          <Providers themeProps={{ defaultTheme: "dark" }}>
            <Navbar />
            <main>{children}</main>
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
