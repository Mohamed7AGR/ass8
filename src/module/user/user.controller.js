import { Router } from "express";
import * as userService from "./user.service.js";
import { decrypt, successResponse, tokenEnum } from "../../common/index.js";
import { authMiddleware } from "../../common/middleware/index.js";
import { roleEnum } from "../../common/enum/index.js";
import { authorizationMiddleware } from "../../common/middleware/authorization.js";
export const userController = Router();

let access=tokenEnum.access;
let refresh=tokenEnum.refresh;

userController.get("/profile", authMiddleware({ role: roleEnum.user, tokenType: access }), async (req, res, next) => {
    let profile = await userService.profile(req.user._id);
    profile.phone = decrypt(profile.phone);
    successResponse(res, 200, profile, "User profile fetched successfully");

  
});
userController.get("/admin/profile", authMiddleware({ role: roleEnum.admin, tokenType: access }), authorizationMiddleware([roleEnum.admin]), async (req, res, next) => {
    let profile = await userService.profile(req.user._id);
    profile.phone = decrypt(profile.phone);
    successResponse(res, 200, profile, "User profile fetched successfully");

  
});

userController.put("/profile", authMiddleware({ }), async (req, res, next) => {
    let data=req.body;
    let updatedUser = await userService.updateProfile(req.user._id, data);
    successResponse(res, 200, updatedUser, "User profile updated successfully");
});
