import Form from "@/components/tasks/edit-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { fetch_task_by_id } from "@/data/task";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { id: string; id_task: string };
}) {
  const id_task_group = params.id;
  const id_task = params.id_task;
  const task = await fetch_task_by_id(id_task);
  console.log(task);
  if (!task) {
    notFound();
  }
  return (
    <main className="space-y-4">
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
            href: `/dashboard/task-groups/${id_task_group}`,
            active: true,
          },
          {
            label: "Task Edit",
            href: `/dashboard/task-groups/${id_task_group}/task/${id_task}`,
            active: true,
          },
        ]}
      />
      <Form task={task} />
    </main>
  );
}
