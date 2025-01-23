import { currentUser } from "./use-current-user";
import { db } from "@/lib/db";

export const currentProject = async () => {
    const user = await currentUser();
    const current_project_id = user?.currentProject?.project_id;
    if (!current_project_id) {
        return
    }
    const current_project = await db.project.findFirst({
        where: {
            id: current_project_id
        }
    });

    if (!current_project) {
        return
    }
    return current_project;
}

export const currentProjectId = async () => {
    const user = await currentUser();
    const current_project_id = user?.currentProject?.project_id;
    if (!current_project_id) throw new Error("No current project found.");
    return current_project_id;
}