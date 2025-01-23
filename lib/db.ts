import { PrismaClient } from "@prisma/client";

// To not make multiple instances of prisma during development through hot reload.

declare global {
    var prisma: PrismaClient;
}

const db = globalThis.prisma || new PrismaClient();

export default db;
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;