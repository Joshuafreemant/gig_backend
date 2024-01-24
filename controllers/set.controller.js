import Set from "../models/set.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const addSet = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");
  const existingSet = await Set.findOne({ set: req.body.set });
  if (existingSet) {
    return res.status(400).json({ error: "Set is already added" });
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    const checkUser = await User.findById(payload.id);

    if (checkUser.role !== "admin") {
      res.status(403).json("You are not allowed to add set");
    } else {
      try {
        const newSet = new Set({
          set: req.body.set,
        });

        await newSet.save();
        const sets = await Set.find();
        res.status(201).json({data:sets, message: "Set added Successfully" });
      } catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
    }
  });
};

//get all sets
export const getAllSet = async (req, res) => {
  try {
    const allSets = await Set.find();
    res.status(200).json(allSets);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all sets
export const deleteSet = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    const checkUser = await User.findById(payload.id);

    if (checkUser.role !== "admin") {
      res.status(403).json("You are not allowed to add set");
    } else {
      try {
        await Set.findByIdAndDelete(req.params.id);
        const remainingSet = await Set.find();
        res
          .status(200)
          .json({ data: remainingSet, message: "Set has been deleted" });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  });
};
