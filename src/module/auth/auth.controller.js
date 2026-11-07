import { Router } from "express";
import * as authService from "./auth.service.js";
import { successResponse, tokenEnum } from "../../common/index.js";
import { authMiddleware } from "../../common/middleware/index.js";
export const authController = Router();

authController.post("/signup", async (req, res, next) => {
  try {
    let user = await authService.signup(req.body);
    successResponse(res, 201, user, "User created successfully");
  } catch (error) {
    next(error);
  }
});
authController.post("/login", async (req, res, next) => {
  try {
    let user = await authService.login(req.body);
    successResponse(res, 200, user, "User logged in successfully");
  } catch (error) {
    next(error);
  }
});

authController.post(
  "/rotate-token",
  authMiddleware({ tokenType: tokenEnum.refresh }),
  async (req, res, next) => {
    try {
      let token = await authService.rotateToken(req.user,req.payload);
      successResponse(res, 200, token, "Token rotated successfully");
    } catch (error) {
      next(error);
    }
  },
);
