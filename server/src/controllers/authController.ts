import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";

const clientId =
  "797530137615-ih5j1t3k3ihv1uuuiapu48hicrh1qep1.apps.googleusercontent.com";
const googleClient = new OAuth2Client(clientId);

const getAll = async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { _id } = req.body as IUser;
  const user = await User.findById(_id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image || "/assets/userImage.png",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (deletedUser) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const userToCreate = new User(req.body);
    const newUser = await userToCreate.save();

    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET!, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES!,
    });

    res.json({ token, id: newUser.id, name: newUser.name });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal Server Error" }).status(500);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.json({ error: "Invalid email or password" }).status(400);
    return;
  }

  const token = jwt.sign({ user }, process.env.TOKEN_SECRET!);

  res.json({ token, id: user!.id, name: user!.name });
};

const googleLogin = async (req: Request, res: Response) => {
  const { tokenId } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: clientId,
    });

    const { sub: googleUserId, email, name, picture } = ticket.getPayload()!;
    const googleUser = await User.findOne({ googleId: googleUserId });

    const token = jwt.sign(
      { googleUserId, email, name },
      process.env.TOKEN_SECRET!
    );

    if (!googleUser) {
      const newUser = await new User({
        name,
        email,
        googleId: googleUserId,
        image: picture,
      }).save();
      res.json({ token, id: newUser._id, name, image: picture });
    } else {
      res.json({ token, id: googleUser._id, name, image: picture });
    }
  } catch (error) {
    console.error("Error during Google token verification:", error);
    res.json({ error: "Internal Server Error" }).status(500);
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const user  = req.body;

  const userToUpdate = await User.findById(user._id);

  if (userToUpdate) {
    userToUpdate.name = user.name || userToUpdate.name;
    userToUpdate.email = user.email || userToUpdate.email;
    userToUpdate.image = user.image || userToUpdate.image;

    if (user.password) {
      userToUpdate.password = user.password;
    }

    const updatedUser = await userToUpdate.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const generateToken = (id: any) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES!,
  });
};

export {
  getAll,
  getById,
  getUserProfile,
  deleteUser,
  register,
  login,
  googleLogin,
  updateUserProfile,
};
