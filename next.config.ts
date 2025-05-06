import type { NextConfig } from "next";


// Puede que desees usar una revisión más robusta para
// almacenar en caché los archivos de manera más eficiente.
// Una opción viable es `git rev-parse HEAD`.
//const revision = crypto.randomUUID();

//const withSerwist = withSerwistInit({
//  cacheOnNavigation: true,
//  swSrc: "app/sw.ts",
//  swDest: "public/sw.js",
// additionalPrecacheEntries: [{ url: "/~offline", revision }],
//});

/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: "https://store-pos-saas-production.up.railway.app/",
  reactStrictMode: true, // Su función es asegurarse de que no se usen funciones obsoletas de React.
};

//export default withSerwist(nextConfig);

export default nextConfig;