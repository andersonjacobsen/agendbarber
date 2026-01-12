import { prisma } from "../../src/lib/prisma";
import request from "supertest";
import { app } from "../../src/app";
import bcrypt from "bcryptjs";

export async function authenticate() {
  await prisma.user.deleteMany();

  const email = `test+${Date.now()}@test.com`;
  const passwordHash = await bcrypt.hash("123456", 8);

  await prisma.user.create({
    data: {
      name: "Test User",
      email,
      password: passwordHash,
    },
  });

  const response = await request(app).post("/v1/sessions").send({
    email,
    password: "123456",
  });

  if (!response.body.token) {
    throw new Error("Authentication failed in tests");
  }

  return response.body.token;
}
