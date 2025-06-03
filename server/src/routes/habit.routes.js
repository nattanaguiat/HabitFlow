import { Router } from "express";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from "../controllers/habit.controller.js";

const router = Router()

router.get("/habits", getHabits)
router.post("/habits", createHabit)
router.put("/habits", updateHabit)
router.delete("/habits", deleteHabit)

export default router