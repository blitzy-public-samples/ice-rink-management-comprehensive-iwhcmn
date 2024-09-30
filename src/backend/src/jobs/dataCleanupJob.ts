import { Job } from 'bull';
import { DataCleanupJob, JobStatus } from '../types/jobs';
import logger from '../utils/logger';
import db from '../db';

/**
 * Executes the data cleanup job
 * @param job The Bull job object containing job data
 */
export async function runDataCleanupJob(job: Job<DataCleanupJob>): Promise<void> {
  try {
    logger.info('Starting data cleanup job', { jobId: job.id });

    const { dataType, olderThan } = job.data;

    // Update job status to RUNNING
    await job.update({ status: JobStatus.RUNNING });

    // Perform data cleanup
    const deletedCount = await cleanupData(dataType, new Date(olderThan));

    logger.info(`Data cleanup completed. Deleted ${deletedCount} records`, { jobId: job.id, dataType, olderThan });

    // Update job status to COMPLETED
    await job.update({ status: JobStatus.COMPLETED });
  } catch (error) {
    logger.error('Error in data cleanup job', { jobId: job.id, error: error.message });
    // Update job status to FAILED
    await job.update({ status: JobStatus.FAILED, error: error.message });
  }
}

/**
 * Performs the actual data cleanup operation
 * @param dataType The type of data to clean up
 * @param olderThan The date threshold for data deletion
 * @returns The number of records deleted
 */
async function cleanupData(dataType: string, olderThan: Date): Promise<number> {
  let tableName: string;

  switch (dataType) {
    case 'bookings':
      tableName = 'bookings';
      break;
    case 'equipment_rentals':
      tableName = 'equipment_rentals';
      break;
    case 'user_activity_logs':
      tableName = 'user_activity_logs';
      break;
    default:
      throw new Error(`Unsupported data type: ${dataType}`);
  }

  const result = await db.query(
    `DELETE FROM ${tableName} WHERE created_at < $1 RETURNING *`,
    [olderThan]
  );

  return result.rowCount;
}

export default runDataCleanupJob;
```

This implementation includes the following features and considerations:

1. The `runDataCleanupJob` function is the main entry point for the job, taking a Bull `Job` object as a parameter.
2. It logs the start of the job, updates the job status to RUNNING, performs the cleanup, logs the result, and updates the job status to COMPLETED.
3. Error handling is implemented, catching any errors, logging them, and updating the job status to FAILED.
4. The `cleanupData` function performs the actual data deletion based on the provided `dataType` and `olderThan` date.
5. It supports multiple data types (bookings, equipment_rentals, user_activity_logs) and can be easily extended to include more.
6. The function uses parameterized queries to prevent SQL injection.
7. It returns the number of deleted records for logging purposes.

Here's a list of the human tasks mentioned in the JSON specification, added as comments:

```typescript
// Human tasks:
// TODO: Review and adjust the data retention policies for each data type (Required)
// TODO: Implement proper error handling and logging for the data cleanup process (Required)
// TODO: Consider adding a dry-run option to preview the data that would be deleted (Optional)
// TODO: Implement a mechanism to notify administrators about the results of the data cleanup job (Optional)