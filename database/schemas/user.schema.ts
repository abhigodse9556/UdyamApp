export const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    businessId TEXT,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    lastSyncAt TEXT NOT NULL,
    syncStatus TEXT DEFAULT 'pending',

    UNIQUE (businessId, email, mobile)
  );
`;
