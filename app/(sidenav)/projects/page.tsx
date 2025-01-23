/* import { Suspense } from "react"; */
//components
import { lusitana } from "@/components/fonts";
import Cards from "@/components/projects/cards";
import { CardsInvitation } from "@/components/invitation/card-invitation-user";
import { CreateProject } from "@/components/projects/redirects";
//functions
import { fetch_projects_owner, fetch_projects_member } from "@/data/projects";

//TODO: move to a separate file for create project button in components/projects/buttons.tsx
//TODO: create skeleton loaders for the components
export default async function Page() {
  const projects_owner = await fetch_projects_owner();
  const projects_member = await fetch_projects_member();
  return (
    <section className="space-y-4">
      <h1 className={`${lusitana.className} text-4xl `}>Projects page</h1>
      <div className=" space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-medium ">Your projects</h2>
          <div className="ml-end">
            <CreateProject />
          </div>
        </div>
        {projects_owner.length === 0 ? (
          <div className="mx-auto flex flex-col items-center justify-center space-y-2">
            <h2 className="text-xl font-medium ">
              You don t have any projects yet.
            </h2>
            <CreateProject />
          </div>
        ) : (
          <Cards ProjectsUser={projects_owner} />
        )}
        <h2 className="text-2xl font-medium ">Projects with you</h2>
        {projects_member.length === 0 ? (
          <div className="mx-auto flex flex-col items-center justify-center space-y-2">
            <h2 className="text-xl font-medium ">
              There are no projects with you yet.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You must have an invitation to a project to start collaborating
              with others.
            </p>
          </div>
        ) : (
          <Cards ProjectsUser={projects_member} />
        )}
        <h3 className="text-2xl font-medium">invitations</h3>
        <CardsInvitation />
      </div>
    </section>
  );
}
