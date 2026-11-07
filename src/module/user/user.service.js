import { exeptions } from "../../common/index.js";
import { userModel } from "../../db/model/user.model.js";

export const profile = async (userId) => {
    let user = await userModel.findById(userId);
    
    if (!user) exeptions.notFoundExeption("User not found");
  return user;
};

export const updateProfile = async (userId, data) => {
    let user = await userModel.findByIdAndUpdate(userId._id, data, { new: true });
    if (!user) exeptions.notFoundExeption("User not found");
    return user;
};

