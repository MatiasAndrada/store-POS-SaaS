import db from "@/lib/db";
import { currentStoreId } from "@/hooks/use-current-store";
import { Prisma } from "@prisma/client";

export async function getAllEmployees(params: Prisma.UsersOnStoresFindManyArgs) {
    try {
        console.log("🦇  select:", params.select);

        // Obtener el storeId, respetando el proporcionado en where
        const storeId = params.where?.storeId ?? (await currentStoreId());

        if (!storeId) {
            throw new Error("No store ID found.");
        }

        // Asegurar que el where tenga el storeId
        const where = { ...params.where, storeId };

        // Validar que no se usen `select` e `include` juntos
        if (params.select && params.include) {
            throw new Error("Please either choose `select` or `include`, but not both.");
        }

        // Ejecutar la consulta con los parámetros recibidos
        const employees = await db.usersOnStores.findMany({ ...params, where });

        return employees;
    } catch (e: any) {
        console.error(e);
        throw new Error("An error occurred while fetching employees");
    }
}
