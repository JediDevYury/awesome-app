import { DatabaseMigration, UserVersion } from '@/types';
import { SQLiteDatabase } from 'expo-sqlite';

export class DbMigrationRunnerService {
  constructor(private db: SQLiteDatabase) {}

  async getVersion(): Promise<UserVersion> {
    try {
      const version = await this.db.getFirstAsync<{
        user_version: number;
      }>('PRAGMA user_version;');

      if (!version) {
        return {
          userVersion: 0,
        };
      }

      return {
        userVersion: version?.user_version,
      };
    } catch (error) {
      throw new Error('Error getting user version', { cause: error });
    }
  }

  private async setVersion(version: number): Promise<void> {
    try {
      await this.db.execAsync(`PRAGMA user_version = ${version};`);
    } catch (error) {
      throw new Error('Cannot save user version', { cause: error });
    }
  }

  private async runMigration(
    userVersion: number,
    migrations: DatabaseMigration[],
  ): Promise<number> {
    if (userVersion === migrations.length) {
      return userVersion;
    }

    const needToRunMigrations = migrations.slice(userVersion);

    for (const migration of needToRunMigrations) {
      await this.db.withTransactionAsync(async () => {
        try {
          await migration.up(this.db);
        } catch (error) {
          throw new Error(`Could not execute migration ${migration.name}`, { cause: error });
        }
      });
    }

    return migrations.length;
  }

  public async apply(migrations: DatabaseMigration[]): Promise<UserVersion> {
    const version = await this.getVersion();

    const newVersion = await this.runMigration(version.userVersion, migrations);

    if (newVersion !== version.userVersion) {
      await this.setVersion(newVersion);
    }

    return this.getVersion();
  }
}
