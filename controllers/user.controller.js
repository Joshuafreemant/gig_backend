import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendActivateEmail } from "./emailController.js";

//UPDATE USER
export const UpdateSingleUser = async (req, res) => {
  const singleUser = await User.findById(req.params.id);

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (payload.id !== singleUser._id.toString()) {
      res.status(403).json("You are not allowed to update this user");
    } else {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 5);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      const { password, ...updatedInfo } = updatedUser._doc;
      res.status(200).json(updatedInfo);
    }
  });
};

//UPDATE USER
export const AdminUpdateSingleUser = async (req, res) => {
  const singleUser = await User.findById(req.params.id);

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    const OneUser = await User.findById(payload.id);

    if (payload.id !== singleUser._id.toString() && OneUser.role !== "admin") {
      res.status(403).json("You are not allowed to update this user");
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
    sendActivateEmail(singleUser.email, singleUser.firstname);

      const allUsers = await User.find();

      // const { password, ...updatedInfo } = updatedUser._doc;
      res.status(200).json(allUsers);
    }
  });
};

//GET
export const getSingleUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");
  try {
    const singleUser = await User.findById(req.params.id);
    const { password, ...info } = singleUser._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

// search SINGLE USER
export const searchUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");
  const searchTerm = req.query.search;
  try {
    const searchResults = await User.find({
      $or: [
        { firstname: { $regex: new RegExp(searchTerm, "i") } },
        { lastname: { $regex: new RegExp(searchTerm, "i") } },
      ],
    });

    res.json(searchResults);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all users
export const getAllUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  try {
    const allUsers = await User.find().sort({ createdAt: -1 });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all users
export const getAllUserBySet = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  try {
    const allUsers = await User.find({
      set:req.query.set
    }).sort({ createdAt: -1 });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};
