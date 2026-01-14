import { beforeAll, afterAll } from "vitest";
import { execSync } from "node:child_process";
import dotenv from "dotenv";
import { prisma } from "../../src/lib/prisma";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    env: {
      ...process.env,
    },
  });

  // Limpa o banco após migração
  await prisma.appointment.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
