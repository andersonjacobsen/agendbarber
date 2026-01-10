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
