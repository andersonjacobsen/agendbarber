import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasourceUrl:
    process.env.NODE_ENV === "test" ? process.env.DATABASE_URL : undefined,
});
