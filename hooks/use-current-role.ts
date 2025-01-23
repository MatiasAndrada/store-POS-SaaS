import { currentUser } from "./use-current-user";
import { Role } from "@prisma/client";

export const currentRole = async () => {
  const user = await currentUser();
  const current_project_user = user?.currentProject;
  const current_role = current_project_user?.role;
  return current_role
};

export async function useProjectRoleHasAccess(role: Role[]) {
  const current_role = await currentRole()
  if (current_role && role.includes(current_role)) {
    return true;
  }
  return false
}