// Import service classes and functions
import { CacheService } from './cacheService';
import { NotificationServiceImpl } from './notificationService';
import { ReportingService } from './reportingService';
import { AnalyticsServiceImpl } from './analyticsService';
import { 
  scheduleMaintenanceTask, 
  updateEquipmentStatus, 
  generateMaintenanceReport, 
  notifyMaintenanceStaff 
} from './maintenanceService';
import { SchedulerServiceImpl } from './schedulerService';
import { 
  uploadFile, 
  getFileUrl, 
  deleteFile, 
  listFiles 
} from './fileStorageService';

// Import configuration
import config from '../config';

// Initialize service instances
const cacheService = new CacheService();
const notificationService = new NotificationServiceImpl();
const reportingService = new ReportingService(config.reporting);
const analyticsService = new AnalyticsServiceImpl();
const schedulerService = new SchedulerServiceImpl();

// Export service instances and functions
export {
  cacheService,
  notificationService,
  reportingService,
  analyticsService,
  schedulerService,
  scheduleMaintenanceTask,
  updateEquipmentStatus,
  generateMaintenanceReport,
  notifyMaintenanceStaff,
  uploadFile,
  getFileUrl,
  deleteFile,
  listFiles
};

// Human tasks (commented)
/*
Human Tasks:
1. [Required] Ensure all service configurations are properly set up in the config files
2. [Optional] Implement dependency injection for better testability and flexibility
3. [Required] Add error handling for service initialization
4. [Required] Create unit tests for the service initialization and exports
*/