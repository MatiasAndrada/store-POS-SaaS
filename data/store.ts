import db from "@/lib/db";
import { current_user_id } from "@/hooks/use-current-user";

export async function fetchStores() {
    const user_id = await current_user_id();
    const stores = await db.usersOnStores.findMany({
        where: {
            userId: user_id
        },
        include: {
            store: true
        }
    })
    return stores;
}