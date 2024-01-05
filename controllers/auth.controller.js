import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { sendResetEmail } from "./emailController.js";


export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).json("User created");
  } catch (error) {
    res.status(500).json("Something went wrong");
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User Not Found");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send("Wrong Password or Username");

    const token=jwt.sign({
        id:user._id
    }, process.env.JWT_KEY)
    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, {
        httpOnly:true
    }).status(200).json(info);
  } catch (error) {
    res.status(500).send("Something went wrong");
    console.log(error);
  }
};
export const logout = async (req, res) => {
    res.clearCookie("accessToken", {
        sameSite:"none",
        secure:true,
    }).status(200).json('User has been logged out')
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();
    // Implement the sendResetEmail function separately
    sendResetEmail(email,resetToken)
    res.json({ message: 'Reset token generated. Check your email for instructions.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { resetPassword };

