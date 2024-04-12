import jwt from "jsonwebtoken";
import { typeAuthBodyRegister } from "../types/auth.types";

export const signToken = (user: Omit<typeAuthBodyRegister, "password">) => {
  const token = jwt.sign(
    {
      id_user: user.id_user,
      email: user.email,
    },
    process.env.JWT_PASSWORD!,
    {
      expiresIn: "2w",
    }
  );
  return token;
};

export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, process.env.JWT_PASSWORD!);
    return true;
  } catch (error) {
    return false;
  }
};
