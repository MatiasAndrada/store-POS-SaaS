"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import {
  GraphIcon,
  SaleIcon,
  InventoryIcon,
  UserGroupIcon,
  SquaresIcon,
} from "../ui/icons/icons";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
interface Link {
  name: string;
  href?: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  state?: "disabled";
}

//TODO: Before development, dropdown for select current store and show the store name in the top of the sidenav
const links: Link[] = [
  /*
  {
    name: "Negocios",
    href: "/stores",
    icon: SquaresIcon,
  },*/
  {
    name: "Panel",
    href: "/dashboard",
    icon: GraphIcon,
  },
  {
    name: "Ventas",
    /*     href: "/dashboard/task-groups", */
    icon: SaleIcon,
  },
  {
    name: "Inventario",
    /*     href: "/dashboard/tasks", */
    icon: InventoryIcon,
  },
  {
    name: "Personal",
    href: "/dashboard/employees",
    icon: UserGroupIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link key={link.name} className="" href={link.href || "#"}>
            <Button
              size="lg"
              variant="shadow"
              color="primary"
              className={cn(
                "w-full items-center justify-start",
                pathname === link.href && "bg-sky-200 text-blue-600"
              )}
              startContent={<LinkIcon />}
            >
              {link.name}
            </Button>
          </Link>
        );
      })}
    </>
  );
}
