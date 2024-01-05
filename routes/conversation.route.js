import express from "express"
import { createConversation, getUserConversation } from "../controllers/conversation.controller.js";
const router = express.Router()

router.post("/",createConversation)
router.get("/:userId",getUserConversation)


export default router;