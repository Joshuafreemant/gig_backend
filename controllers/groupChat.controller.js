import GroupMessage from "../models/groupChat.model.js";

export const createGroupMessage = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  try {
    const newMessage = new GroupMessage(req.body);
    await newMessage.save();
    const groupChats = await GroupMessage.find({
      set: req.body.set,
    }); //return all GROUP CHATS to the frontend
    res.status(201).json({ message: " Successfully", groupChats });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getGroupMessages = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");
  try {
    const messages = await GroupMessage.find({
      set: req.params.set,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
