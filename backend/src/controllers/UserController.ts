import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { AppError } from "../errors/AppError";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Nome, email e senha são obrigatórios", 400);
    }

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}
