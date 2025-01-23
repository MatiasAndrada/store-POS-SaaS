import NextAuth, { type DefaultSession } from "next-auth";
import type { UsersOnStores } from "@prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
    currentStoreId: string;
    currentStore: UsersOnStores,
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        currentStoreId: string;
        currentStore: UsersOnStores,
        isTwoFactorEnabled: boolean;
        email: string;
        isOAuth: boolean;
    }
}

