import express from "express"
import { UpdateSingleUser, getAllUser, getSingleUser, searchUser } from "../controllers/user.controller.js";
const router = express.Router()

router.get("/get-single-user/:id", getSingleUser)
router.put("/update-single-user/:id", UpdateSingleUser)
router.get("/search-user", searchUser)
router.get("/get-all-user", getAllUser)

export default router;