import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "@/data/account";
import type { UsersOnStores } from "@prisma/client";

const adapter = PrismaAdapter(db);

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    /* update, */
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) return false;

                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }
            if (token.currentStoreId && session.user) {
                session.user.currentStoreId = token.currentStoreId as string;
                session.user.currentStore = token.currentStore as UsersOnStores;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;
            if (existingUser.currentStoreId) {
                token.currentStoreId = existingUser.currentStoreId;
            }
            const existingAccount = await getAccountByUserId(
                existingUser.id
            );
            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        },

    },
    adapter: adapter,
    session: { strategy: "jwt" },
    ...authConfig,
});

