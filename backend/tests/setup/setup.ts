import { beforeAll } from "vitest";
import { execSync } from "node:child_process";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

beforeAll(() => {
  execSync("npx prisma migrate deploy", {
    env: {
      ...process.env,
    },
  });
});
