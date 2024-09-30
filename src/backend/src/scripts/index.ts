import yargs from 'yargs';
import { runMigrations } from './dbMigrate';
import { main as runSeeding } from './dbSeed';
import logger from '../utils/logger';

/**
 * The main function that parses command-line arguments and executes the appropriate database script
 * @returns {Promise<void>} A promise that resolves when the selected operation is complete
 */
async function main(): Promise<void> {
  try {
    // Set up yargs to parse command-line arguments
    const argv = yargs
      .command('migrate', 'Run database migrations')
      .command('seed', 'Run database seeding')
      .demandCommand(1, 'You must provide a valid command')
      .help()
      .argv;

    const command = argv._[0];

    logger.info(`Starting ${command} operation`);

    switch (command) {
      case 'migrate':
        await runMigrations();
        break;
      case 'seed':
        await runSeeding();
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }

    logger.info(`${command} operation completed successfully`);
  } catch (error) {
    logger.error(`Error during script execution: ${error.message}`);
    process.exit(1);
  }
}

// Execute the main function
main();

// TODO: Implement additional database management commands as needed (e.g., rollback, reset)
// TODO: Add proper error handling and descriptive error messages for each command
// TODO: Implement a help command to display usage instructions
// TODO: Consider adding a 'verbose' flag for detailed logging during script execution