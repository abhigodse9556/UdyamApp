import { v4 as uuid } from "uuid";
import db from "../index";

const userRepo = {
  create: async (user: {
    id: string;
    name: string;
    mobile?: string;
    email?: string;
  }) => {
    const id = uuid();
    await db.runAsync(
      `
      INSERT INTO users (id, name, mobile, email, createdAt)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        id,
        user.name,
        user.mobile ?? null,
        user.email ?? null,
        new Date().toISOString(),
      ],
    );
  },

  getAll: async () => {
    return await db.getAllAsync(`
      SELECT * FROM users
      ORDER BY createdAt DESC
    `);
  },

  delete: async (id: string) => {
    await db.runAsync(`DELETE FROM users WHERE id = ?`, [id]);
  },
};

export default userRepo;
