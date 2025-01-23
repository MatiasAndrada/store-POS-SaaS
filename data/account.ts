import db from "@/lib/db";

export async function getAccountByUserId(userId: string) {
    try {
        const account = await db.account.findFirst({
            where: {
                userId,
            },
        });

        return account;
    } catch (e: any) {
        console.error(e);
        throw new Error("An error occurred while fetching account");
    }
}