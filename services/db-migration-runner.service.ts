import { DatabaseMigration, UserVersion } from '@/types';
import { SQLiteDatabase } from 'expo-sqlite';

export class DbMigrationRunnerService {
  constructor(private db: SQLiteDatabase) {}

  async getVersion(): Promise<UserVersion> {
    try {
      const version = await this.db.getFirstAsync<{
        user_version: number;
      }>('PRAGMA user_version;');

      return {
        userVersion: version?.user_version ?? 0,
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

    return migrations.slice(userVersion).reduce(async (versionPromise, migration, index) => {
      const version = await versionPromise;

      await this.db.withTransactionAsync(async () => {
        try {
          console.log(`Applying migration ${migration.name}`);
          await migration.up(this.db);
        } catch (error) {
          throw new Error(`Could not execute migration ${migration.name}`, { cause: error });
        }
      });

      return version + index + 1;
    }, Promise.resolve(userVersion));
  }

  private async resetVersion(): Promise<void> {
    await this.setVersion(0);
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
