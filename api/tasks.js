import express from "express";
const router = express.Router();
export default router;

import {
  createTask,
  getAllTasks,
  getTasksByUser,
  deleteTask,
  updateTask,
  getTaskByTaskId,
} from "#db/queries/tasks";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router
  .route("/")
  .post(requireUser, requireBody(["title", "done"]), async (req, res) => {
    const { title, done } = req.body;
    const newTask = await createTask({ title, done, user_id: req.user.id });
    res.status(201).send(newTask);
  })
  .get(requireUser, async (req, res) => {
    const id = req.user.id;
    const tasks = await getTasksByUser(id);
    res.status(200).send(tasks);
  });

router.param("id", async (req, res, next, id) => {
  const task = await getTaskByTaskId(id);
  if (!task) return res.status(404).send("Task not found.");
  req.task = task;
  next();
});

router
  .route("/:id")
  .put(requireUser, requireBody(["title", "done"]), async (req, res) => {
    if (req.user.id !== req.task.user_id) {
      return res.status(403).send("You are not authorized to view this task.");
    }
    const { title, done } = req.body;
    const updatedTask = await updateTask({
      id: req.task.id,
      title,
      done,
      user_id: req.user.id,
    });
    res.send(updatedTask);
  })
  .delete(requireUser, async (req, res) => {
    if (req.user.id !== req.task.user_id) {
      return res
        .status(403)
        .send("You are not authorized to delete this task.");
    }
    const id = req.task.id;
    await deleteTask(id);
    res.status(204).send("Task deleted.");
  });
