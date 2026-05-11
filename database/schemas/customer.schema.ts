export const customerSchema = `
  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY NOT NULL,
    businessId TEXT,
    name TEXT NOT NULL,
    mobile TEXT,
    email TEXT,
    discount REAL DEFAULT 0,
    category TEXT DEFAULT 'walkin',
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,

    UNIQUE (businessId)
  );
`;
