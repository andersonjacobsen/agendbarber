import { prisma } from "../lib/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IRequest) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Email ou senha inválidos", 401);
    }

    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
