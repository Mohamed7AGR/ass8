import dotenv from "dotenv";
import { resolve } from "path";

let envFile = resolve(`.env.${process.env.NODE_ENV || "development"}`);
dotenv.config({ path: envFile });
export default {
  PORT: Number(process.env.PORT),
  DB_URI: process.env.DB_URI,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  ENCRYPTION_IV: Number(process.env.ENCRYPTION_IV),
  ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  JWT_ADMIN_ACCESS_SECRET: process.env.JWT_ADMIN_ACCESS_SECRET,
  JWT_ADMIN_REFRESH_SECRET: process.env.JWT_ADMIN_REFRESH_SECRET,
  JWT_USER_ACCESS_SECRET: process.env.JWT_USER_ACCESS_SECRET,
  JWT_USER_REFRESH_SECRET: process.env.JWT_USER_REFRESH_SECRET,
};
