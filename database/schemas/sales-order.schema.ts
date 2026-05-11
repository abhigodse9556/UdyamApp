export const salesOrderSchema = `
  CREATE TABLE IF NOT EXISTS sales_orders (
    id TEXT PRIMARY KEY NOT NULL,
    customerId TEXT,
    total REAL NOT NULL,
    createdAt TEXT NOT NULL
  );
`;
