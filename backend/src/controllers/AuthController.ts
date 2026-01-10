import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const result = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json(result);
  }
}
