import { SQLiteDatabase } from 'expo-sqlite';

async function drop(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`PRAGMA user_version = 0;`);

  await Promise.all([
    db.execAsync('DROP TABLE IF EXISTS Categories;'),
    db.execAsync('DROP TABLE IF EXISTS Transactions;'),
  ]);
}

export default drop;
