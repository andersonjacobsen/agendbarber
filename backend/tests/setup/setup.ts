import { beforeAll } from "vitest";
import { execSync } from "node:child_process";

beforeAll(() => {
  execSync("npx prisma migrate deploy", {
    env: {
      ...process.env,
    },
  });
});
