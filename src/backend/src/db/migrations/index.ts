import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import { createDatabaseConnection } from '../../config/database';

// Create and configure an Umzug instance for managing migrations
const createMigrator = (sequelize: Sequelize): Umzug => {
  return new Umzug({
    migrations: { glob: 'src/backend/src/db/migrations/*.ts' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
};

// Run all pending migrations
export const runMigrations = async (): Promise<void> => {
  try {
    const sequelize = await createDatabaseConnection();
    const migrator = createMigrator(sequelize);
    await migrator.up();
    console.log('All migrations have been executed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
};

// Revert the last applied migration
export const revertLastMigration = async (): Promise<void> => {
  try {
    const sequelize = await createDatabaseConnection();
    const migrator = createMigrator(sequelize);
    await migrator.down();
    console.log('Last migration has been reverted successfully.');
  } catch (error) {
    console.error('Error reverting last migration:', error);
    throw error;
  }
};

// Retrieve the status of all migrations
export const getMigrationStatus = async (): Promise<object> => {
  try {
    const sequelize = await createDatabaseConnection();
    const migrator = createMigrator(sequelize);
    const executed = await migrator.executed();
    const pending = await migrator.pending();
    return {
      executed: executed.map(migration => migration.name),
      pending: pending.map(migration => migration.name),
    };
  } catch (error) {
    console.error('Error getting migration status:', error);
    throw error;
  }
};

// List of human tasks
/*
Human tasks:
1. Create individual migration files for each database schema change (Required)
2. Implement a rollback strategy for failed migrations (Required)
3. Set up a migration testing process to ensure migrations can be applied and reverted successfully (Required)
4. Document the migration process and best practices for the development team (Optional)
*/