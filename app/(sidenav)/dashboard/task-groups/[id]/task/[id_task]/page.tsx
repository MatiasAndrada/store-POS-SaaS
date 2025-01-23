/* "use client"; */
import { Metadata } from "next";
import { inter } from "@/components/fonts";
import Breadcrumbs from "@/components/breadcrumbs";
import TabsContent from "@/components/tasks/tabs/tabs";
import { EditTask } from "@/components/tasks/redirects";
import { fetch_task_by_id } from "@/data/task";

export const metadata: Metadata = {
  title: "Task",
};

export default async function Page({
  params: { id, id_task },
}: {
  params: { id: string; id_task: string };
}) {
  const task = await fetch_task_by_id(id_task);
  if (!task) {
    return <div>Task not found</div>;
  }
  const { name, description, status, progress, createdAt } = task;

  return (
    <main className="space-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Task Groups",
            href: "/dashboard/task-groups",
            active: true,
          },
          {
            label: "Tasks of Task Group",
            href: `/dashboard/task-groups/${id}`,
            active: true,
          },
          {
            label: "Task Details",
            href: `/dashboard/task-groups/${id}/task/${id_task}`,
            active: true,
          },
        ]}
      />
      <div className="grid grid-cols-5 grid-rows-3 gap-4">
        <div className="col-span-2 row-span-2">
          <div className="flex flex-col items-start justify-start p-2 divide-y-4 divide-slate-900 bg-slate-300 dark:bg-slate-900 rounded-lg shadow-md gap-4">
            <div>
              <div className="flex justify-between">
                <p className="my-2 text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                  Name:
                </p>
                <div className="ml-auto">
                  <EditTask id_task_group={id} id_task={id_task} />
                </div>
              </div>
              <h2 className={`${inter.className} text-4xl `}>
                {name ?? ""}
                {!name?.endsWith(".") && "."}
              </h2>
            </div>
            <div>
              <p className="my-2 text-xs font-bold uppercase text-slate-400 dark:text-slate-500">
                Description:
              </p>
              <p className={`${inter.className} text-lg `}>
                {description ?? ""}
                {!description?.endsWith(".") && "."}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3 row-span-2">
          <TabsContent
            id={id_task}
            status={status}
            progress={progress}
            createdAt={createdAt}
          />
        </div>
      </div>
    </main>
  );
}
