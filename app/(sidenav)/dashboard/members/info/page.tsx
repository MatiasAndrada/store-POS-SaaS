import { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import { CardInfo } from "@/components/members/card-info";
import { Role } from "@prisma/client";

export const metadata: Metadata = {
  title: {
    template: "%s | Project Admin",
    default: "Members info roles",
  },
  description: "",
};

export default function Page() {
  return (
    <section className="h-full space-y-6 ">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Members",
            href: "/dashboard/members",
          },
          {
            label: "Member roles info",
            href: "/dashboard/members/info",
            active: true,
          },
        ]}
      />
      <div className="flex justify-around items-center content-center gap-2">
        {rolesPermissions.map(({ role, permissions }) => (
          <CardInfo key={role} role={role} permissions={permissions} />
        ))}
      </div>
    </section>
  );
}

const rolesPermissions = [
  {
    role: Role.OWNER,
    permissions: [
      "Delete project",
      "Manage project",
      "Manage task groups",
      "Assign tasks",
      "Manage tasks",
      "Manage members",
      "Manage roles",
    ],
  },
  {
    role: Role.ADMIN,
    permissions: [
      "Manage task groups",
      "Assign tasks",
      "Manage tasks",
      "Manage members",
      "Manage roles",
    ],
  },
  {
    role: Role.EDITOR,
    permissions: ["Edit task groups", "Edit tasks"],
  },
  {
    role: Role.VIEWER,
    permissions: ["Only view"],
  },
];
