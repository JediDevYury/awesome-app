import { SQLiteDatabase } from 'expo-sqlite';

export type UserVersion = {
  userVersion: number;
};

export type DatabaseMigration = {
  name: string;
  up: (db: SQLiteDatabase) => Promise<void>;
};
