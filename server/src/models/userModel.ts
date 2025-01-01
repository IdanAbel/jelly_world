import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image: string;
  googleId?: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default: "/uploads/userImage.png",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password || "");
};

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password || "", salt);
  next();
});

const userModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default userModel;
