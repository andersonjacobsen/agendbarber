import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "../src/app";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

describe("Authentication", () => {
  let email: string;
  const password = "123456";

  beforeEach(async () => {
    await prisma.user.deleteMany();

    email = `test+${Date.now()}@test.com`;
    const passwordHash = await bcrypt.hash(password, 8);

    await prisma.user.create({
      data: {
        name: "Anderson",
        email,
        password: passwordHash,
      },
    });
  });

  it("should be able to authenticate with valid credentials", async () => {
    const response = await request(app).post("/v1/sessions").send({
      email,
      password,
    });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token");

    expect(response.body.user).toEqual(
      expect.objectContaining({
        name: "Anderson",
        email,
      })
    );
  });
});
