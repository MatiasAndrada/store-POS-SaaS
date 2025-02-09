import db from "@/lib/db";
import { currentStoreId } from "@/hooks/use-current-store";

export async function getStoreScheduleOpen() {
    const storeId = await currentStoreId();
    const schedule = await db.storeSchedule.findFirst({
        where: {
            storeId: storeId
        }
    });
    return schedule;
}