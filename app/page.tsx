//Components
import { IconWithText } from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { LoginButton } from "@/components/buttons-auth";
/* import { StatusSession } from "@/components/home/StatusSession";
import FadeImages from "@/components/home/FadeImages"; */

export default function Page() {
  return (
    <main className="h-screen flex flex-col p-4">
      <div className="flex h-20 md:h-28 shrink-0 items-center justify-between rounded-lg bg-primary p-4">
        <IconWithText />
        <ThemeToggle />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:gap-12 md:flex-row">
        <div className="h-full flex flex-col justify-around rounded-lg bg-slate-300 dark:bg-slate-800 px-8 py-4 md:w-2/5 md:px-20">
          {/*           <div className="flex flex-row items-center justify-between">
                       <StatusSession />
          </div> */}
          <p className={`text-xl md:text-3xl md:leading-normal `}>
            <strong>Bienvenido a SasS POS market</strong>@versión beta del
            proyecto.{" "}
            <a
              href="https://github.com/MatiasAndrada/nextjs-adminProject"
              className="text-primary hover:text-secondary transition-colors"
            >
              Construido con next15, next-auth-v5, prisma ORM, typescript
            </a>
            , desplegado en Cloudflare.
          </p>
          <LoginButton />
        </div>
        <div className="hidden md:flex items-center justify-center md:w-3/5  relative overflow-hidden rounded-lg">
          <div className="absolute w-full	h-full bg-gradient-to-r from-blue-500/75 via-transparent to-sky-500/75 blur-lg"></div>
          {/*           <FadeImages /> */}
        </div>
      </div>
    </main>
  );
}
