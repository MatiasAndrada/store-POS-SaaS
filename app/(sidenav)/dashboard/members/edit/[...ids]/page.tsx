import { notFound } from "next/navigation";
import EditRole from "@/components/members/edit-role";
import Breadcrumbs from "@/components/breadcrumbs";
import { fetch_member_by_id } from "@/data/members";

export default async function Page({ params }: { params: { ids: string[] } }) {
  const ids = params.ids;
  const user_id = ids[0];
  const project_id = ids[1];
  const userOnProject = await fetch_member_by_id(user_id, project_id);
  if (!userOnProject) return notFound();

  return (
    <main className="space-y-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Members", href: "/dashboard/members", active: true },
          {
            label: "Edit Role a Member",
            href: "/dashboard/members/add",
            active: true,
          },
        ]}
      />
      <EditRole userOnProject={userOnProject} />
    </main>
  );
}
