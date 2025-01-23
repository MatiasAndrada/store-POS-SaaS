import "./globals.css";
/* import type { Metadata } from "next"; */
import { UIProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={` antialiased text-black dark:text-white`} id="main_layout"
      >
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
