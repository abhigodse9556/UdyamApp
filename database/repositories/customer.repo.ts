import { v4 as uuid } from "uuid";
import db from "../index";

const customerRepo = {
  create: async (customer: { id: string; name: string; mobile?: string }) => {
    const id = uuid();
    await db.runAsync(
      `
      INSERT INTO customers (id, name, mobile, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        id,
        customer.name,
        customer.mobile ?? null,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    );
  },

  getAll: async () => {
    return await db.getAllAsync(`
      SELECT * FROM customers
      ORDER BY createdAt DESC
    `);
  },

  delete: async (id: string) => {
    await db.runAsync(`DELETE FROM customers WHERE id = ?`, [id]);
  },
};

export default customerRepo;
