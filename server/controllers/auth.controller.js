import User from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { otpEmailTemplate } from "../utils/emailTemplate.js";

export const register = async(req,res,next) => {
    try {
        const {name,email,password} = req.body;   
        if(!name || !email || !password){
            throw new ApiError(400,"All fields are required");
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new ApiError(409,"User already exist");
        }

        const user = await User.create({name,email,password});
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            }
        });
    }catch(error){
        next(error);
    }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid Login credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid Login credentials");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    next(error);
  }
};


export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    })
    .status(200)
    .json({ success: true, message: "Logged out" });
};

export const Me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    // Don't reveal if email exists or not (security best practice)
    if (!user) {
      return res.status(200).json({ message: "If this email exists, an OTP has been sent." });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP + expiry (10 mins) to user document
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; //10 minutes
    
    await user.save({ validateBeforeSave: false }); // skips validator,hook still hashes

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: `"Thinkboard" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Thinkboard Password Reset OTP",
      html: otpEmailTemplate(otp), 
    });
    res.status(200).json({ message: "If this email exists, an OTP has been sent." });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid request." });

    if (user.resetOtp !== otp)
      return res.status(400).json({ message: "Invalid OTP." });

    if (Date.now() > user.resetOtpExpiry)
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });

    user.password = newPassword;
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;

    await user.save({ validateBeforeSave: false }); //skips validator,hook still hashes

    res.status(200).json({ message: "Password reset successful." });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
