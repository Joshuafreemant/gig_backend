import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  try {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET
export const getUserConversation = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
