export const counterSchema = `
  CREATE TABLE IF NOT EXISTS counters (
    key TEXT PRIMARY KEY NOT NULL,
    value INTEGER NOT NULL
  );
`;
