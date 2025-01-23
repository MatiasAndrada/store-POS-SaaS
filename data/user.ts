import db from "@/lib/db";
import { Prisma } from "@prisma/client";

type IncludeOptions = Prisma.UserInclude | undefined;

export async function getUserByEmail(email: string, include?: IncludeOptions) {
    try {
        const user = await db.user.findUnique({
            where: { email },
            include: include,
        });
        return user;
    } catch (e: any) {
        console.error(e);
        throw new Error("An error occurred while fetching user");
    }
}

export async function getUserById(id: string, include?: IncludeOptions) {
    try {
        const user = await db.user.findUnique({
            where: { id },
            include: include,
        });
        return user;
    } catch (e: any) {
        console.error(e);
        throw new Error("An error occurred while fetching user");
    }
}
