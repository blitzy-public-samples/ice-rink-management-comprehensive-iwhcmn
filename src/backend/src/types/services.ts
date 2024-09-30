/**
 * This file contains type definitions for various services used in the backend
 * of the Ice Rink Management and Booking System. It defines interfaces and types
 * for cache, notification, reporting, analytics, maintenance, scheduler, and
 * file storage services.
 */

/**
 * Interface for the cache service used to store and retrieve frequently accessed data
 */
export interface CacheService {
  /**
   * Set a value in the cache
   * @param key The key to store the value under
   * @param value The value to store
   * @param ttl Time to live in seconds
   * @returns Promise resolving when the value is set
   */
  set(key: string, value: any, ttl: number): Promise<void>;

  /**
   * Get a value from the cache
   * @param key The key to retrieve the value for
   * @returns Promise resolving with the cached value or null if not found
   */
  get(key: string): Promise<any>;

  /**
   * Delete a value from the cache
   * @param key The key to delete
   * @returns Promise resolving when the key is deleted
   */
  del(key: string): Promise<void>;
}

/**
 * Interface for the notification service used to send various types of notifications
 */
export interface NotificationService {
  /**
   * Send an email notification
   * @param to The recipient's email address
   * @param subject The email subject
   * @param body The email body
   * @returns Promise resolving when the email is sent
   */
  sendEmail(to: string, subject: string, body: string): Promise<void>;

  /**
   * Send an SMS notification
   * @param phoneNumber The recipient's phone number
   * @param message The SMS message
   * @returns Promise resolving when the SMS is sent
   */
  sendSMS(phoneNumber: string, message: string): Promise<void>;

  /**
   * Send a push notification
   * @param userId The user ID to send the push notification to
   * @param title The notification title
   * @param body The notification body
   * @returns Promise resolving when the push notification is sent
   */
  sendPushNotification(userId: string, title: string, body: string): Promise<void>;
}

/**
 * Type representing a generated report
 */
export type Report = {
  id: string;
  type: string;
  generatedAt: Date;
  data: object;
};

/**
 * Interface for the reporting service used to generate various reports
 */
export interface ReportingService {
  /**
   * Generate a booking report
   * @param startDate The start date for the report period
   * @param endDate The end date for the report period
   * @returns Promise resolving with the generated report
   */
  generateBookingReport(startDate: Date, endDate: Date): Promise<Report>;

  /**
   * Generate a revenue report
   * @param startDate The start date for the report period
   * @param endDate The end date for the report period
   * @returns Promise resolving with the generated report
   */
  generateRevenueReport(startDate: Date, endDate: Date): Promise<Report>;
}

/**
 * Type representing analytics data
 */
export type AnalyticsData = {
  eventName: string;
  count: number;
  aggregatedData: object;
};

/**
 * Interface for the analytics service used to track and analyze user behavior
 */
export interface AnalyticsService {
  /**
   * Track an event
   * @param eventName The name of the event to track
   * @param eventData Additional data associated with the event
   * @returns Promise resolving when the event is tracked
   */
  trackEvent(eventName: string, eventData: object): Promise<void>;

  /**
   * Get analytics data for a specific event
   * @param eventName The name of the event to analyze
   * @param startDate The start date for the analysis period
   * @param endDate The end date for the analysis period
   * @returns Promise resolving with the analytics data
   */
  getEventAnalytics(eventName: string, startDate: Date, endDate: Date): Promise<AnalyticsData>;
}

/**
 * Type representing a maintenance task
 */
export type MaintenanceTask = {
  id: string;
  taskName: string;
  dueDate: Date;
  assignedTo: string;
  status: string;
};

/**
 * Interface for the maintenance service used to manage equipment and facility maintenance
 */
export interface MaintenanceService {
  /**
   * Schedule a maintenance task
   * @param taskName The name of the maintenance task
   * @param dueDate The due date for the task
   * @param assignedTo The person or team assigned to the task
   * @returns Promise resolving with the created maintenance task
   */
  scheduleMaintenanceTask(taskName: string, dueDate: Date, assignedTo: string): Promise<MaintenanceTask>;

  /**
   * Get upcoming maintenance tasks
   * @returns Promise resolving with an array of upcoming maintenance tasks
   */
  getUpcomingMaintenanceTasks(): Promise<MaintenanceTask[]>;
}

/**
 * Type representing configuration for creating a schedule
 */
export type ScheduleConfig = {
  defaultSlotDuration: number;
  operatingHours: string[];
  specialHours: object;
};

/**
 * Type representing a time slot in a schedule
 */
export type TimeSlot = {
  id: string;
  startTime: Date;
  endTime: Date;
  status: string;
};

/**
 * Type representing a created schedule
 */
export type Schedule = {
  id: string;
  rinkId: string;
  startDate: Date;
  endDate: Date;
  slots: TimeSlot[];
};

/**
 * Interface for the scheduler service used to manage ice rink schedules
 */
export interface SchedulerService {
  /**
   * Create a schedule for a rink
   * @param rinkId The ID of the rink
   * @param startDate The start date of the schedule
   * @param endDate The end date of the schedule
   * @param config The configuration for creating the schedule
   * @returns Promise resolving with the created schedule
   */
  createSchedule(rinkId: string, startDate: Date, endDate: Date, config: ScheduleConfig): Promise<Schedule>;

  /**
   * Get available time slots for a rink on a specific date
   * @param rinkId The ID of the rink
   * @param date The date to check for available slots
   * @returns Promise resolving with an array of available time slots
   */
  getAvailableSlots(rinkId: string, date: Date): Promise<TimeSlot[]>;
}

/**
 * Interface for the file storage service used to store and retrieve files
 */
export interface FileStorageService {
  /**
   * Upload a file to the storage
   * @param fileName The name of the file to upload
   * @param fileData The file data as a Buffer
   * @returns Promise resolving with the URL of the uploaded file
   */
  uploadFile(fileName: string, fileData: Buffer): Promise<string>;

  /**
   * Get the URL of a file in the storage
   * @param fileName The name of the file to retrieve the URL for
   * @returns Promise resolving with the URL of the requested file
   */
  getFileUrl(fileName: string): Promise<string>;

  /**
   * Delete a file from the storage
   * @param fileName The name of the file to delete
   * @returns Promise resolving when the file is deleted
   */
  deleteFile(fileName: string): Promise<void>;
}

// Human tasks:
// TODO: Review and validate the service interfaces and types to ensure they meet all project requirements
// TODO: Consider adding any additional service-specific types or interfaces that may be needed