import db from "../lib/db";
import { currentUserOnStore } from "./use-current-user-on-store";

export const currentStore = async () => {
    try {
        const userOnStore = await currentUserOnStore();
        const storeId = userOnStore?.storeId;
        if (!storeId) {
            throw new Error("No store ID found");
        }
        const store = await db.store.findUnique({
            where: {
                id: storeId,
            },
        });
        if (!store) {
            throw new Error("No store found");
        }
        return store;
    } catch (error) {
        console.error("Error fetching current store:", error);
    }
}

export const currentStoreId = async () => {
    try {
        const id = (await currentStore())?.id;
        if (!id) {
            throw new Error("No store ID found");
        }
        return id;

    } catch (error) {
        console.error("Error fetching current store ID:", error);
    }
}