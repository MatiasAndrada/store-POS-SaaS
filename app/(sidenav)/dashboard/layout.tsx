import { Suspense } from "react";
import { Metadata } from "next";
import { NextUIProvider } from "@/context/NextUIProvider";
import { currentProject } from "@/hooks/use-current-project";
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
  const project = await currentProject();
  return (
    <>
      {project === undefined ? (
        <div className="flex items-center justify-center h-screen w-full mx-auto">
          <h3 className="text-2xl text-red-500 h-32">
            First you must select a project!
          </h3>
        </div>
      ) : (
        <div /* className="h-screen flex-grow md:overflow-y-auto  p-6 md:p-12" */
        >
          <NextUIProvider>
            <Suspense fallback={<Loader1 />}>{children}</Suspense>
          </NextUIProvider>
        </div>
      )}
    </>
  );
}
