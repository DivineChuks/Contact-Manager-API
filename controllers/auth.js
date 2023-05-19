import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//@desc Register User
//route POST
//@access /api/auth/register

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  const { password: userPassword, ...others } = user._doc;
  if (user) {
    res.status(201).json(others);
  } else {
    res.status(400).send("User data is not valid");
  }
});

//@desc Login User
//route POST
//@access /api/auth/login

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400);
    throw new Error("Password is invalid");
  }

  const accessToken = jwt.sign(
    {
      user: {
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ accessToken });
});
