import db from "@/lib/db";

export async function getTwoFactorConfirmationByUserId(
    userId: string
) {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: { userId }
        });
        return twoFactorConfirmation;
    } catch (e: any) {
        console.error(e);
        throw new Error("An error occurred while fetching two factor confirmation");
    }
};
