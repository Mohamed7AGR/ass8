import { exeptions } from "../index.js";
import { roleEnum } from "../enum/index.js";

export const authorizationMiddleware = (accpetedRoles=[]) => {
    
    return (req, res, next) => {
        if (!accpetedRoles.includes(req.payload.role)) {
            return next(exeptions.unauthorizedExeption("Unauthorized"));
        }
        next();
    }
}