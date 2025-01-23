import db from "@/lib/db";
import { v4 as generateUUID } from "uuid";
//tokens
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

//!AUTH
export const generateTwoFactorToken = async (email: string) => {
    const token = Math.floor(Math.random() * 900000) + 100000; // Genera un número aleatorio de 6 dígitos
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            }
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token: token.toString(),
            expires,
        }
    });

    return twoFactorToken;
}

export const generatePasswordResetToken = async (email: string) => {
    const token = await generateUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = await generateUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });

    return verificationToken;
};

//!MEMBERS INVITE\
/* export const generateInviteToken = async (project_id: string, email: string) => {
    const token = await generateUUID();
    const expires = new Date(new Date().getTime() + 72 * 60 * 60 * 1000); // Set expiration time to 72 hours (3 days)

    const existingToken = await db.inviteToken.findFirst({
        where: {
            email,
        }
    });

    if (existingToken) {
        await db.inviteToken.delete({
            where: {
                id: existingToken.id,
            }
        });
    }

    await db.inviteToken.create({
        data: {
            project_id,
            email,
            token,
            expires,
        }
    });
    return token;
}; */
