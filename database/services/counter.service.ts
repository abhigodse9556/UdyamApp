import db from "@/database";

export const getNextSequence = async (key: string) => {
  await db.runAsync(
    `
    INSERT OR IGNORE INTO counters
    (key, value)
    VALUES (?, 0)
    `,
    [key],
  );

  await db.runAsync(
    `
    UPDATE counters
    SET value = value + 1
    WHERE key = ?
    `,
    [key],
  );

  const result = await db.getFirstAsync<{
    value: number;
  }>(
    `
    SELECT value
    FROM counters
    WHERE key = ?
    `,
    [key],
  );

  return result?.value ?? 1;
};
