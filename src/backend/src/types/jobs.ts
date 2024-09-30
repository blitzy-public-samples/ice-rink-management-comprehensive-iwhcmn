/**
 * This file contains type definitions for background jobs and scheduled tasks
 * in the Ice Rink Management and Booking System backend.
 */

/**
 * Enum representing the possible statuses of a job
 */
export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

/**
 * Base interface for all job types
 */
export interface Job {
  id: string;
  type: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for the daily report generation job
 */
export interface DailyReportJob extends Job {
  type: 'DAILY_REPORT';
  date: Date;
}

/**
 * Interface for the maintenance reminder job
 */
export interface MaintenanceReminderJob extends Job {
  type: 'MAINTENANCE_REMINDER';
  rinkId: string;
  maintenanceType: string;
  scheduledDate: Date;
}

/**
 * Interface for the data cleanup job
 */
export interface DataCleanupJob extends Job {
  type: 'DATA_CLEANUP';
  dataType: string;
  olderThan: Date;
}

/**
 * Union type for all possible job payloads
 */
export type JobPayload = DailyReportJob | MaintenanceReminderJob | DataCleanupJob;

/**
 * Human tasks:
 * TODO: Review and confirm that all necessary job types for the Ice Rink Management and Booking System are included
 * TODO: Ensure that the job types align with the actual implementation of background jobs in the system
 * TODO: Consider adding more specific properties to job types if required by the implementation
 */