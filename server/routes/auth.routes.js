import { Router } from "express";
import { register, login, logout, Me,forgotPassword,resetPassword, googleCallback } from "../controllers/auth.controller.js";
import { validateRegister,validateLogin } from "../middlewares/validation.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import passport from "../config/passport.js"


export const authRouter = Router();

authRouter.post("/register",validateRegister, register);
authRouter.post("/login", validateLogin, login);
authRouter.post("/logout", logout);
authRouter.get("/me", authenticateUser, Me);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password",  resetPassword);
authRouter.get("/google",passport.authenticate("google",{scope: ["profile","email"], session: false}));
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${CLIENT_URL}/login?error=google_auth_failed`,
  }),
  googleCallback
);


