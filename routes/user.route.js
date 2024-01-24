import express from "express"
import { AdminUpdateSingleUser, UpdateSingleUser, getAllUser, getAllUserBySet, getSingleUser, searchUser } from "../controllers/user.controller.js";
const router = express.Router()

router.get("/get-single-user/:id", getSingleUser)
router.put("/update-single-user/:id", UpdateSingleUser)
router.put("/activate-user/:id", AdminUpdateSingleUser)
router.get("/search-user", searchUser)
router.get("/get-all-user", getAllUser)
router.get("/get-all-users", getAllUserBySet)

export default router;