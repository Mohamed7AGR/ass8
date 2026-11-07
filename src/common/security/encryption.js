import crypto from "node:crypto";
import configService from "../../config/config.service.js";
let { ENCRYPTION_KEY, ENCRYPTION_IV, ENCRYPTION_ALGORITHM } = configService;
const algorithm = ENCRYPTION_ALGORITHM;
const key = Buffer.from(ENCRYPTION_KEY, "hex");
export const encrypt = (plainText) => {
  const iv = crypto.randomBytes(ENCRYPTION_IV);
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let result = cipher.update(plainText, "utf8", "hex");
  result += cipher.final("hex");
  return `${iv.toString("hex")}::${result}`;
};

export const decrypt = (cypherText) => {
  let [hexIv, encrypted] = cypherText.split("::");
  const iv = Buffer.from(hexIv, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let result = decipher.update(encrypted, "hex", "utf8");
  result += decipher.final("utf8");
  return result;
};
