import Link from "next/link";
/* import { currentUser } from "@/hooks/use-current-user";*/
import SideNav from "@/components/dashboard/sidenav";
import { LogoutButton } from "@/components/buttons-auth";
/* import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; */
/* import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from "../../components/ui/dropdown-menu"; */
import { Toaster } from "sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*   const user = await currentUser(); */
  return (
    <section>
      <Toaster richColors />
      <div className="flex flex-col md:flex-row">
        <div className=" w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="h-screen relative flex-grow p-6 md:overflow-y-auto ">
          <div className="absolute top-3 right-3 flex items-center justify-end gap-2 ">
            <h2 className="text-lg font-medium md:text-xl">
              {/*               Hi!
              {user && ` ${user.name}`} */}
            </h2>
            {/*   <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-14 w-14">
                  {user && user.image ? (
                    <AvatarImage src={user.image} alt="Icon user" />
                  ) : (
                    <AvatarFallback>{user?.name}</AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent className="mr-4 md:mr-10">
                  <DropdownMenuLabel className="text-green-500">
                    Free plan
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="text-sm font-light">
                    {user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2 bg-slate-300" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-4 bg-slate-300" />
                  <DropdownMenuItem>
                    <LogoutButton
                      variant={"ghost"}
                      className="text-red-500 dark:text-red-500"
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu> */}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
