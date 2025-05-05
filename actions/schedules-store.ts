"use server"

import db from "@/lib/db"
import type { StoreSchedule } from "@prisma/client"


export async function SetScheduleStore(schedule: StoreSchedule[]) {
    try {
        await db.storeSchedule.createMany(
            {
                data: schedule
            }
        )
    } catch (error) {
        console.error(error)
        throw new Error("Error al guardar el horario")
    }
}
