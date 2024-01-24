import express from "express"
import { addSet, deleteSet, getAllSet } from "../controllers/set.controller.js";
const router = express.Router()

router.post("/new-set", addSet)
router.get("/all-set", getAllSet)
router.delete("/delete-set/:id", deleteSet)


export default router;