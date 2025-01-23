import Form from "@/components/task-group/create-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { lusitana } from "@/components/fonts";

export default function Page() {
  return (
    <main className="space-y-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tasks Group", href: "/dashboard/task-groups" },
          {
            label: "Create Task Group",
            href: "/dashboard/task-groups/create",
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
