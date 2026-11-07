import { hash, compare } from "bcrypt";
import configService from "../../config/config.service.js";
export const hashPassword = async ({ palinText }) => {
  return await hash(palinText, configService.SALT_ROUNDS);
};
export const comparePassword = async ({ palinText, encrypted }) => {
  return await compare(palinText, encrypted);
};
