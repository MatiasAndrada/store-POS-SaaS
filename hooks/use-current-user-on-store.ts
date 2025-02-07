import db from "@/lib/db";
import { currentUser } from "./use-current-user";

export async function currentUserOnStore() {
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

export async function currentUserOnStoreId() {
    try {
        const user = await currentUser();
        const current_store_id = user?.currentStoreId;
        if (!current_store_id) {
            throw new Error("No current store ID found");
        }
        return current_store_id;
    } catch (error) {
        console.error("Error fetching current store ID:", error);
    }
}