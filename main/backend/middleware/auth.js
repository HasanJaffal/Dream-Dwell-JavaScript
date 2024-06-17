import { UnauthenticatedError,ForbiddenError } from "../error/index.js";
import asyncHandler from "./async-handler.js";
import jwt  from "jsonwebtoken";

import { findById } from "../controller/methods.js";

//check if user is authenticated
export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!token) {
      throw new UnauthenticatedError("Login first to access this resource.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await findById(decoded.userId, 'user');
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

//handling users roles
export const authorizeRoles = (...roles) => {
   return  async (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      throw new ForbiddenError(`Role (${req.user.role}) is not allowed to access this resource`)
    }
    next()
}
};
