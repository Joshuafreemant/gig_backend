import express from "express"
import { createMessage, getConversationMessages } from "../controllers/message.controller.js";
import { createGroupMessage, getGroupMessages } from "../controllers/groupChat.controller.js";
const router = express.Router()

router.post("/",createMessage)
router.get("/:conversationId",getConversationMessages)
router.get("/set/:set",getGroupMessages)
router.post("/set",createGroupMessage)


export default router;