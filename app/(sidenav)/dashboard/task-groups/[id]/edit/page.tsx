import Form from "@/components/task-group/edit-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { fetch_task_group_by_id } from "@/data/task-group";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const task_group = await fetch_task_group_by_id(id);
  if (!task_group) {
    notFound();
  }
  return (
    <main className="space-y-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Task Groups", href: "/dashboard/task-groups" },
          {
            label: "Edit Task Group",
            href: `/dashboard/task-groups/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form taskGroup={task_group} />
    </main>
  );
}
