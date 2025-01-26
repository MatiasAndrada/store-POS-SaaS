import "./globals.css";
/* import type { Metadata } from "next"; */
import { UIProvider } from "../context/UIProvider";
import { SessionProvider } from "next-auth/react";
import { EnvProvider } from "@/context/EnvContextProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={` antialiased text-black dark:text-white`}
        id="main_layout"
      >
        <EnvProvider>
          <SessionProvider>
            <UIProvider>{children}</UIProvider>
          </SessionProvider>
        </EnvProvider>
      </body>
    </html>
  );
}
