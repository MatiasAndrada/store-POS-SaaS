import Link from "next/link";

import NavLinks from "@/components/dashboard/nav-links";
/* import { DropDownProjects } from "@/components/dashboard/dropdown-projects"; */
import { IconWithText } from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { LogoutButton } from "@/components/buttons-auth";

import { fetchStores } from "@/data/store";
import { currentProject } from "@/hooks/use-current-project";

export default async function SideNav() {
  const [stores, project] = await Promise.all([
    fetchStores(),
    currentProject(),
  ]); //Peticiones en paralelo
  return (
    <div className=" h-screen w-full bg-slate-300 dark:bg-slate-900  flex flex-col gap-2">
      <div className=" bg-blue-500 p-2 flex flex-col h-fit items-center justify-around gap-4">
        <div className="pt-2 flex flex-row items-center gap-1 justify-around w-full">
          <IconWithText redirect="/projects" />
          <ThemeToggle />
        </div>
        {/*         <DropDownProjects items={stores} selectedProject={project} /> */}
      </div>
      <div className="mx-2 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="bg-slate-300 dark:bg-slate-900 hidden h-auto w-full grow rounded-md  md:block"></div>
      </div>

      <div className="mb-6 mx-2 flex-none flex flex-col justify-end md:justify-start">
        {/*  <Button variant={"sidenav"}> */}
        <LogoutButton />
        {/*         </Button> */}
      </div>
    </div>
  );
}
