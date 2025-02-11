import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { CustomRequest } from "../common/customTypes";

export const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        if (!req.body.isAuthenticatedWithGoogle) {
          req.user = await User.findById(decoded.user?._id).select("-password");
        } else {
          req.user = await User.findOne({ googleId: decoded.googleUserId }) || undefined;
        }

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Unauthorized, token is broken.");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized, token is missing.");
    }
  }
);
