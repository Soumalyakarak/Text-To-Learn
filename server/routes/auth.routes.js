import { Router } from "express";
import { register, login, logout, Me,forgotPassword,resetPassword } from "../controllers/auth.controller.js";
import { validateRegister,validateLogin } from "../middlewares/validation.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register",validateRegister, register);
authRouter.post("/login", validateLogin, login);
authRouter.post("/logout", logout);
authRouter.get("/me", authenticateUser, Me);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password",  resetPassword);


