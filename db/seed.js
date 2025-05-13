import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const USERS_SEED = [
    {
      username: "HouseLiver",
      password: "sweeping",
    },
    {
      username: "CatLuvr",
      password: "purr",
    },
  ];

  for (const user of USERS_SEED) {
    await createUser(user);
  }

  const TASKS_SEED = [
    {
      title: "Sweeping",
      done: true,
      user_id: 1,
    },
    {
      title: "Dishes",
      done: false,
      user_id: 1,
    },
    {
      title: "Laundry",
      done: false,
      user_id: 1,
    },
    {
      title: "Yardwork",
      done: false,
      user_id: 2,
    },
    {
      title: "Make the bed",
      done: true,
      user_id: 2,
    },
    {
      title: "Kitty litter",
      done: true,
      user_id: 2,
    },
  ];

  for (const task of TASKS_SEED) {
    await createTask(task);
  }
}
