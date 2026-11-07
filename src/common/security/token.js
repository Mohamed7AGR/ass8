import jwt from "jsonwebtoken";
import configService from "../../config/config.service.js";
import { tokenEnum } from "../enum/token.enum.js";
import { roleEnum } from "../enum/index.js";





export const getSecret = (role, tokenType) => {
  const secrets = getRoleSecret(role);
  return tokenType === tokenEnum.refresh ? secrets.refresh : secrets.access;
};

export const getRoleSecret=(role)=>{
  let secret;
switch(role){
  case roleEnum.admin:
    secret = {
      access: configService.JWT_ADMIN_ACCESS_SECRET,
      refresh: configService.JWT_ADMIN_REFRESH_SECRET,
    }
    break;
  case roleEnum.user:
    secret = {
      access: configService.JWT_USER_ACCESS_SECRET,
      refresh: configService.JWT_USER_REFRESH_SECRET,
    }
    break;
  default:
    throw new Error("Invalid role");
}
return secret;
}

export const generateToken = (payload, options = {},role=roleEnum.user) => {
  payload.role = role;
  let secret = getRoleSecret(role);
  let accessToken = jwt.sign(payload, secret.access, { expiresIn: configService.JWT_EXPIRES_IN, ...options });
  let refreshToken = jwt.sign(payload, secret.refresh, { expiresIn: configService.JWT_REFRESH_EXPIRES_IN, ...options });
  return { accessToken: accessToken, refreshToken: refreshToken };
};


export const verifyToken = (token,role=roleEnum.user,tokenType=tokenEnum.access) => {
  let secret = getSecret(role,tokenType);
  return jwt.verify(token, secret);
};
