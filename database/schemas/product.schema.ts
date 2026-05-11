export const productSchema = `
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock REAL DEFAULT 0,
    createdAt TEXT NOT NULL
  );
`;
