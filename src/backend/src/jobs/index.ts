import Bull from 'bull';
import { executeDailyReportJob } from './dailyReportJob';
import { processMaintenanceReminder, scheduleMaintenanceReminder } from './maintenanceReminderJob';
import { runDataCleanupJob } from './dataCleanupJob';
import { JobType } from '../types/jobs';
import logger from '../utils/logger';

// Define the job queues
const dailyReportQueue = new Bull('dailyReport');
const maintenanceReminderQueue = new Bull('maintenanceReminder');
const dataCleanupQueue = new Bull('dataCleanup');

/**
 * Initializes all job queues and sets up their processors
 */
export function initializeJobQueues(): void {
  try {
    // Set up queue processors
    dailyReportQueue.process(async (job) => {
      await executeDailyReportJob();
    });

    maintenanceReminderQueue.process(async (job) => {
      await processMaintenanceReminder(job.data);
    });

    dataCleanupQueue.process(async (job) => {
      await runDataCleanupJob();
    });

    logger.info('Job queues initialized successfully');
  } catch (error) {
    logger.error('Error initializing job queues:', error);
    throw error;
  }
}

/**
 * Schedules a new job based on the job type
 * @param jobType The type of job to schedule
 * @param jobData The data required for the job
 * @param options The Bull job options
 * @returns A promise that resolves with the scheduled job
 */
export async function scheduleJob(
  jobType: JobType,
  jobData: any,
  options: Bull.JobOptions
): Promise<Bull.Job> {
  try {
    let queue: Bull.Queue;
    switch (jobType) {
      case JobType.DailyReport:
        queue = dailyReportQueue;
        break;
      case JobType.MaintenanceReminder:
        queue = maintenanceReminderQueue;
        break;
      case JobType.DataCleanup:
        queue = dataCleanupQueue;
        break;
      default:
        throw new Error(`Invalid job type: ${jobType}`);
    }

    const job = await queue.add(jobData, options);
    logger.info(`Job scheduled successfully: ${jobType}`, { jobId: job.id });
    return job;
  } catch (error) {
    logger.error(`Error scheduling job: ${jobType}`, error);
    throw error;
  }
}

// Export the job queues for external use if needed
export { dailyReportQueue, maintenanceReminderQueue, dataCleanupQueue };

// Schedule the maintenance reminder job (assuming it needs to be scheduled separately)
scheduleMaintenanceReminder(maintenanceReminderQueue);

// Human tasks (commented)
/**
 * TODO: Human Tasks
 * 1. Implement proper error handling for job queue initialization (Required)
 * 2. Set up monitoring and alerting for failed jobs across all queues (Required)
 * 3. Implement a mechanism to gracefully shut down job queues (Optional)
 * 4. Consider implementing a job dashboard for monitoring and managing jobs (Optional)
 */