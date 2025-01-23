import { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import Search from "@/components/search";
import { RoleGate } from "@/components/auth/role-gate";
import Table from "@/components/tasks/table-head";
import Pagination from "@/components/pagination";
import { CreateTask } from "@/components/tasks/redirects";
import { fetch_task_pages } from "@/data/task";
import { Role } from "@prisma/client";

export const metadata: Metadata = {
  title: {
    template: "%s | Project Admin",
    default: "Tasks",
  },
  description: "",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  /*     const tasks = await fetch_all_tasks_of_project(); */
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetch_task_pages(query);

  return (
    <div className="w-full space-y-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Tasks", href: "/dashboard/tasks", active: true },
        ]}
      />
      <div>
        {/*                 <h2 className="mb-1 ml-4 text-xl font-base">All task of project</h2> */}
        <div className="flex items-center justify-between gap-2">
          <Search placeholder="Search tasks..." />
          <RoleGate allowedRoles={[Role.OWNER, Role.ADMIN]}>
            <CreateTask />
          </RoleGate>
        </div>
      </div>

      <Table query={query} currentPage={currentPage} />
      {totalPages > 1 && (
        <div className="flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
