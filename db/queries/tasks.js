import db from "#db/client";

/** Creates and @returns a new task. */
export async function createTask({ title, done, user_id }) {
  const sql = `
    INSERT INTO tasks
        (title, done, user_id)
    VALUES 
        ($1, $2, $3)
    RETURNING *
    `;

  const {
    rows: [task],
  } = await db.query(sql, [title, done, user_id]);
  return task;
}

/** @returns all tasks currently in the database. */
export async function getAllTasks() {
  const sql = `
  SELECT *
  FROM tasks
  `;

  const {
    rows: [tasks],
  } = await db.query(sql);
  return tasks;
}

/** @returns all tasks owned by the logged in user */
export async function getTasksByUser(id) {
  const sql = `
  SELECT *
  FROM tasks
  WHERE user_id = $1
  `;

  const { rows: tasks } = await db.query(sql, [id]);
  return tasks;
}

/** @updates a specific task owned by the logged in user */
export async function updateTask({ id, title, done, user_id }) {
  const sql = `
  UPDATE tasks
  SET
    title = $2,
    done = $3
  WHERE id = $1 AND user_id = $4
  RETURNING *
  `;

  const result = await db.query(sql, [id, title, done, user_id]);
  return result.rows[0];
}

/** @deletes a task owned by the logged in user */
export async function deleteTask(id) {
  const sql = `
  DELETE FROM tasks
  WHERE id=$1`;

  const result = await db.query(sql, [id]);
  return result.rows[0];
}

/** @returns a single task owned by the logged-in user */
export async function getTaskByTaskId(id) {
  const sql = `
  SELECT *
  FROM tasks
  WHERE id=$1
  `;

  const task = await db.query(sql, [id]);
  return task.rows[0];
}
