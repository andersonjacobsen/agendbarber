import { prisma } from "../src/lib/prisma";
import request from "supertest";
import { app } from "../src/app";
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import bcrypt from "bcryptjs";

describe("Appointments", () => {
  let token: string;

  beforeAll(async () => {
    // Limpa dados antigos
    await prisma.appointment.deleteMany();
    await prisma.user.deleteMany();

    // Cria usuário para teste
    const email = `anderson+${Date.now()}@email.com`;
    const passwordHash = await bcrypt.hash("123456", 8);

    await prisma.user.create({
      data: {
        name: "Anderson",
        email,
        password: passwordHash,
      },
    });

    // Autentica e obtém token válido
    const response = await request(app).post("/v1/sessions").send({
      email,
      password: "123456",
    });

    token = response.body.token;

    // Blindagem para evitar 401 silencioso
    expect(token).toBeTruthy();
  });

  it("should be able to create an appointment", async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(13, 0, 0, 0);

    const response = await request(app)
      .post("/v1/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Anderson",
        phone: "11999999999",
        date: date.toISOString(),
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id");
  });

  it("should not allow two appointments at the same time", async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(10, 0, 0, 0);

    await request(app)
      .post("/v1/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Anderson",
        phone: "11999999999",
        date: date.toISOString(),
      });

    const response = await request(app)
      .post("/v1/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Maria",
        phone: "11888888888",
        date: date.toISOString(),
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Horário já agendado");
  });

  it("should not allow appointment in the past", async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    pastDate.setHours(10, 0, 0, 0);

    const response = await request(app)
      .post("/v1/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Anderson",
        phone: "11999999999",
        date: pastDate.toISOString(),
      });

    expect(response.status).toBe(400);
  });

  it("should not allow appointment outside business hours", async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(7, 0, 0, 0);

    const response = await request(app)
      .post("/v1/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Anderson",
        phone: "11999999999",
        date: date.toISOString(),
      });

    expect(response.status).toBe(400);
  });

  it("should not allow appointment with minutes different from zero", async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(10, 30, 0, 0);

    const response = await request(app)
      .post("/v1/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Anderson",
        phone: "11999999999",
        date: date.toISOString(),
      });

    expect(response.status).toBe(400);
  });

  it("should allow appointment exactly at 08:00", async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(8, 0, 0, 0);

    const response = await request(app)
      .post("/v1/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Anderson",
        phone: "11999999999",
        date: date.toISOString(),
      });

    expect(response.status).toBe(201);
  });

  it("should allow appointment exactly at 18:00", async () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(18, 0, 0, 0);

    const response = await request(app)
      .post("/v1/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Anderson",
        phone: "11999999999",
        date: date.toISOString(),
      });

    expect(response.status).toBe(201);
  });
});
