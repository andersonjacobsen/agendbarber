import { prisma } from "../src/lib/prisma";
import request from "supertest";
import { app } from "../src/app";
import { beforeEach, describe, it, expect } from "vitest";

describe("Appointments", () => {
  beforeEach(async () => {
    await prisma.appointment.deleteMany();
  });

  it("should be able to create an appointment", async () => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + 1);
    date.setUTCHours(13, 0, 0, 0);

    const response = await request(app).post("/v1/appointments").send({
      name: "Anderson",
      phone: "11999999999",
      date,
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id");
  });
});

it("should not allow two appointments at the same time", async () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(10, 0, 0, 0);

  await request(app).post("/v1/appointments").send({
    name: "Anderson",
    phone: "11999999999",
    date,
  });

  const response = await request(app).post("/v1/appointments").send({
    name: "Maria",
    phone: "11888888888",
    date,
  });

  expect(response.status).toBe(409);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Horário já agendado");
});

it("should not allow appointment in the past", async () => {
  const pastDate = new Date();
  pastDate.setHours(10, 0, 0, 0);
  pastDate.setDate(pastDate.getDate() - 1);

  const response = await request(app).post("/v1/appointments").send({
    name: "Anderson",
    phone: "11999999999",
    date: pastDate,
  });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});

it("should not allow appointment outside business hours", async () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(8, 0, 0, 0); // antes das 9h

  const response = await request(app).post("/v1/appointments").send({
    name: "Anderson",
    phone: "11999999999",
    date,
  });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});

it("should not allow appointment with minutes different from zero", async () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(10, 30, 0, 0); // minutos inválidos

  const response = await request(app).post("/v1/appointments").send({
    name: "Anderson",
    phone: "11999999999",
    date,
  });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
});
