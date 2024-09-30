import { Job } from 'bull';
import { MaintenanceReminderJob, JobStatus } from '../types/jobs';
import logger from '../utils/logger';
import notificationService from '../services/notificationService';
import rinkService from '../services/rinkService';

/**
 * Processes a maintenance reminder job
 * @param job The job object containing the maintenance reminder data
 * @returns A promise that resolves when the job is completed
 */
export async function processMaintenanceReminder(job: Job<MaintenanceReminderJob>): Promise<void> {
  try {
    // Extract job data from the job object
    const { rinkId, maintenanceDate, maintenanceType } = job.data;

    // Log the start of the maintenance reminder job
    logger.info(`Starting maintenance reminder job for rink ${rinkId}`);

    // Fetch rink details using rinkService
    const rink = await rinkService.getRinkById(rinkId);

    if (!rink) {
      throw new Error(`Rink with id ${rinkId} not found`);
    }

    // Generate reminder message
    const reminderMessage = `Reminder: ${maintenanceType} maintenance is scheduled for ${rink.name} on ${maintenanceDate.toDateString()}.`;

    // Send notification using notificationService
    await notificationService.sendNotification(rink.managerId, reminderMessage);

    // Update job status to COMPLETED
    await job.update({ status: JobStatus.COMPLETED });

    // Log successful completion of the job
    logger.info(`Maintenance reminder job completed for rink ${rinkId}`);
  } catch (error) {
    // Handle any errors and update job status to FAILED if an error occurs
    logger.error(`Error processing maintenance reminder job: ${error.message}`);
    await job.update({ status: JobStatus.FAILED, error: error.message });
    throw error;
  }
}

/**
 * Schedules a new maintenance reminder job
 * @param jobData The data for the maintenance reminder job
 * @returns A promise that resolves with the scheduled job
 */
export async function scheduleMaintenanceReminder(jobData: MaintenanceReminderJob): Promise<Job<MaintenanceReminderJob>> {
  try {
    // Create a new Bull job with the provided job data
    const queue = new Bull('maintenanceReminder');
    const job = await queue.add(jobData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 60000, // 1 minute
      },
      removeOnComplete: true,
      removeOnFail: false,
    });

    logger.info(`Scheduled maintenance reminder job for rink ${jobData.rinkId}`);
    return job;
  } catch (error) {
    logger.error(`Error scheduling maintenance reminder job: ${error.message}`);
    throw error;
  }
}