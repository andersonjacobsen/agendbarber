import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import { app } from "../src/app";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

describe("Authentication", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();

    const passwordHash = await bcrypt.hash("123456", 8);

    await prisma.user.create({
      data: {
        name: "Anderson",
        email: "anderson@email.com",
        password: passwordHash,
      },
    });
  });

  it("should be able to authenticate with valid credentials", async () => {
    const response = await request(app).post("/v1/sessions").send({
      email: "anderson@email.com",
      password: "123456",
    });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toMatchObject({
      name: "Anderson",
      email: "anderson@email.com",
    });
  });
});
