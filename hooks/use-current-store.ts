import { currentUser } from "./use-current-user";
import db from "../lib/db";

export const currentStore = async () => {
    try {
        const user = await currentUser();
        const current_store_id = user?.currentStoreId
        const current_store = await db.usersOnStores.findUnique({
            where: {
                id: current_store_id
            }
        });

        return current_store;
    } catch (error) {
        console.error("Error fetching current store:", error);
    }
}

export const currentStoreId = async () => {
    try {
        const user = await currentUser();
        const current_project_id = user?.currentStoreId;
        return current_project_id;
    } catch (error) {
        console.error("Error fetching current store ID:", error);
    }
}