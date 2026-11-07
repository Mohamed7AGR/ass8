import { userModel } from "../../db/model/index.js";
import ms from "ms";

import {
  comparePassword,
  exeptions,
  hashPassword,
  encrypt,
  decrypt,
} from "../../common/index.js";
import { generateToken } from "../../common/security/index.js";
import configService from "../../config/config.service.js";

export const signup = async (data) => {
  let isExists = await userModel.findOne({ email: data.email });
  if (isExists) exeptions.conflictExeption("Email already exists");
  data.password = await hashPassword({ palinText: data.password });
  data.phone = encrypt(data.phone);
  let user = await userModel.create(data);
  let { accessToken, refreshToken } = generateToken({ sub: user._id });
  return {
    user,
    accessToken,
    refreshToken,
  };};

export const login = async ({ email, password }) => {
  let user = await userModel.findOne({ email });
  let matchPassword = await comparePassword({
    palinText: password,
    encrypted: user.password,
  });
  if (!user || !matchPassword)
    exeptions.unauthorizedExeption("Invalid email or password");
  user.phone = decrypt(user.phone);
  let { accessToken, refreshToken } = generateToken({ sub: user._id }, {}, user.role);
  return {
    user,
    accessToken,
    refreshToken,
  };
};


export const rotateToken = async (user,payload) => {
  let accessIat=payload.iat*1000;
  let accessExp=ms(configService.JWT_EXPIRES_IN);
  let accessExpAt = accessIat + accessExp;
  if (Date.now() < accessExpAt) {
    exeptions.unauthorizedExeption("Token still valid");
  }
  let {accessToken}= generateToken({ sub: user._id });
  return {accessToken};

}