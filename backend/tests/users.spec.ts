import request from "supertest";
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { app } from "../src/app";
import { prisma } from "../src/lib/prisma";

describe("User registration", () => {
  const password = "123456";
  let email: string;

  beforeAll(async () => {
    email = `anderson+${Date.now()}@email.com`;
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("should be able to register a new user", async () => {
    const response = await request(app).post("/v1/users").send({
      name: "Anderson",
      email,
      password,
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe(email);
  });

  it("should not allow duplicate email", async () => {
    await request(app).post("/v1/users").send({
      name: "Anderson",
      email,
      password,
    });

    const response = await request(app).post("/v1/users").send({
      name: "Anderson 2",
      email,
      password,
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Email já cadastrado");
  });
});
