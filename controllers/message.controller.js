import Message from "../models/messages.model.js";

export const createMessage = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated");

  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getConversationMessages = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("You are not authenticated");
    try {
        const messages = await Message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
      } catch (err) {
        res.status(500).json(err);
      }
  };
  