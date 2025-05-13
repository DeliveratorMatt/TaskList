import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import { createToken } from "#utils/jwt";
import requireBody from "#/middleware/requireBody";

router.route("/register").post(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).send("Request body must have: username, password.");
  const newUser = await createUser({ username, password });

  const token = createToken({ id: newUser.id });
  res.status(201).send(token);
});

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = createToken({ id: user.id });
    res.send(token);
  });
