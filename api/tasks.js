import express from "express";
const router = express.Router();
export default router;

import { createTask, getAllTasks, deleteTask } from "#db/queries/tasks";
