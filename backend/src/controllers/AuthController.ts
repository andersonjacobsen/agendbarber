import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { z } from "zod";

export class AuthController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const authenticateUserService = new AuthenticateUserService();

    const result = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json(result);
  }
}
