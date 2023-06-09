import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("User not logged in ", 401));

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decode._id);
  next();
});

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this course `
      ),
      403
    );

  next();
};

export const authorizeSubscribers = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.subscrption !== "active")
    return next(
      new ErrorHandler(
        `non-premium users are not allowed to access this resourse`
      ),
      403
    );

  next();
};
