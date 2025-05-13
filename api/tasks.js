import express from "express";
const router = express.Router();
export default router;

import { createTask, getAllTasks, deleteTask } from "#db/queries/tasks";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router
  .route("/")
  .post(requireUser, requireBody(["title", "done"]), async (req, res) => {
    const { title, done } = req.body;
    const newTask = await createTask({ title, done, user_id: req.user.id });
    res.status(201).send(newTask);
  });
