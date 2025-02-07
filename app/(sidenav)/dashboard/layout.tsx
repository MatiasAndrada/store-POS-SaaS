import { Suspense } from "react";
import { Metadata } from "next";
import { currentStore } from "@/hooks/use-current-store";
import { Loader1 } from "@/components/loaders";

export const metadata: Metadata = {
  title: {
    template: "%s | Project Admin", // El %s se reemplazara con el título de la página especifica
    default: "Dashboard",
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await currentStore();

  return (
    <>
      {store === undefined ? (
        <div className="flex items-center justify-center h-screen w-full mx-auto  ">
          <h3 className="text-2xl text-red-500 h-32">
            Primero selecciona una tienda para continuar.
          </h3>
        </div>
      ) : (
        <div /* className="h-screen flex-grow md:overflow-y-auto  p-6 md:p-12" */
        >
          <Suspense fallback={<Loader1 />}>{children}</Suspense>
        </div>
      )}
    </>
  );
}
