import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },
    googleId: { type: String, unique: true, sparse: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Required ONLY if it's not a Google OAuth user
      },
      select: false,
      validate: {
        validator: function (value) {
          // Skip validation for OAuth users who don't have a password
          if (this.googleId && !value) return true;
          return validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });
        },
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
      },
    },
    completedLessons: {
      type: [String], //Stores strings like "courseId-modIdx-lesIdx"
      default: [],
    },

    resetOtp: { type: String },
    resetOtpExpiry: { type: Date },
  },

  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);