import express from "express";
import { getProgress, toggleProgress } from "../controllers/progress.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:courseId", authenticateUser, getProgress);
router.post("/toggle", authenticateUser, toggleProgress);

router.stack.forEach(r => {
    if (r.route && r.route.path) {
      console.log(`✅ Registered Progress Route: ${r.route.stack[0].method.toUpperCase()} ${r.route.path}`);
    }
});
export const progressRouter = router;