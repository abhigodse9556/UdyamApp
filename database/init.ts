import db from "./index";
import schemas from "./schemas";

export const initializeDatabase = async () => {
  try {
    // for production change "DELETE" to "WAL" for better performance and concurrency
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
    `);

    // Enable foreign key constraints
    await db.execAsync(`
      PRAGMA foreign_keys = ON;
    `);

    // Execute all schemas
    for (const schema of schemas) {
      await db.execAsync(schema);
    }

    const databases = await db.getAllAsync(`
    PRAGMA database_list;
  `);
    // Debug log
    console.info("Database initialized successfully", databases);

    // Optional: print all tables
    const tables = await db.getAllAsync(`
      SELECT name
      FROM sqlite_master
      WHERE type='table'
      ORDER BY name;
    `);

    console.info("Tables:", tables);
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};

export default initializeDatabase;
