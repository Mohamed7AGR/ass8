import { userModel } from "../../db/model/user.model.js";
import { verifyToken } from "../security/index.js";
import { exeptions } from "../index.js";
import { tokenEnum } from "../enum/index.js";
import { roleEnum } from "../enum/index.js";

export const authMiddleware = ({ role=roleEnum.user, tokenType=tokenEnum.access }) => {
    return async (req, res, next) => {
      let token = req.headers.authorization;
      if (!token) return next(exeptions.unauthorizedExeption("invalid token"));
      let payload = verifyToken(token, role, tokenType);


      req.user = await userModel.findById(payload.sub);
      req.payload = payload;
      next();
    };
  };
