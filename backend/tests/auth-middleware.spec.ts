import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import { app } from "../src/app";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

describe("Authentication middleware", () => {
  let token: string;

  beforeEach(async () => {
    await prisma.appointment.deleteMany();
    await prisma.user.deleteMany();

    const email = `anderson+${Date.now()}@email.com`;
    const passwordHash = await bcrypt.hash("123456", 8);

    await prisma.user.create({
      data: {
        name: "Anderson",
        email,
        password: passwordHash,
      },
    });

    const authResponse = await request(app).post("/v1/sessions").send({
      email,
      password: "123456",
    });

    token = authResponse.body.token;
  });

  it("should not allow access without token", async () => {
    const response = await request(app).get("/v1/appointments");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token não informado");
  });

  it("should not allow access with invalid token", async () => {
    const response = await request(app)
      .get("/v1/appointments")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token inválido");
  });

  it("should allow access with valid token", async () => {
    const response = await request(app)
      .get("/v1/appointments")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
