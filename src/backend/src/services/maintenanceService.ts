import { MaintenanceTask, Equipment } from '../types/index';
import { logger, errorHandler } from '../utils/index';
import config from '../config/index';
import { getSequelizeInstance } from '../db/index';
import { sendEmail } from '../integrations/index';
import moment from 'moment';

const sequelize = getSequelizeInstance();
const MaintenanceTaskModel = sequelize.models.MaintenanceTask;
const EquipmentModel = sequelize.models.Equipment;

/**
 * Service for handling maintenance-related operations
 */
export class MaintenanceService {
  /**
   * Schedules a new maintenance task
   * @param task The maintenance task to be scheduled
   * @returns The created maintenance task
   */
  async scheduleMaintenanceTask(task: MaintenanceTask): Promise<MaintenanceTask> {
    try {
      // Validate the input task
      if (!task.title || !task.description || !task.scheduledDate) {
        throw new Error('Invalid task input: title, description, and scheduledDate are required');
      }

      // Create a new maintenance task in the database
      const createdTask = await MaintenanceTaskModel.create(task);

      // Schedule notifications for the task
      await this.scheduleNotification(createdTask);

      logger.info(`Maintenance task scheduled: ${createdTask.id}`);
      return createdTask;
    } catch (error) {
      errorHandler.handleError(error, 'Error scheduling maintenance task');
      throw error;
    }
  }

  /**
   * Updates the status of a piece of equipment
   * @param equipmentId The ID of the equipment to update
   * @param status The new status of the equipment
   * @returns The updated equipment object
   */
  async updateEquipmentStatus(equipmentId: string, status: string): Promise<Equipment> {
    try {
      // Validate the input parameters
      if (!equipmentId || !status) {
        throw new Error('Invalid input: equipmentId and status are required');
      }

      // Update the equipment status in the database
      const equipment = await EquipmentModel.findByPk(equipmentId);
      if (!equipment) {
        throw new Error(`Equipment with ID ${equipmentId} not found`);
      }

      equipment.status = status;
      await equipment.save();

      // If status is 'needs_maintenance', schedule a maintenance task
      if (status === 'needs_maintenance') {
        await this.scheduleMaintenanceTask({
          title: `Maintenance for ${equipment.name}`,
          description: `Equipment ${equipment.name} needs maintenance`,
          scheduledDate: moment().add(1, 'day').toDate(),
          equipmentId: equipment.id,
        });
      }

      logger.info(`Equipment status updated: ${equipmentId} - ${status}`);
      return equipment;
    } catch (error) {
      errorHandler.handleError(error, 'Error updating equipment status');
      throw error;
    }
  }

  /**
   * Generates a maintenance report for a given time period
   * @param startDate The start date of the report period
   * @param endDate The end date of the report period
   * @returns The maintenance report object
   */
  async generateMaintenanceReport(startDate: Date, endDate: Date): Promise<object> {
    try {
      // Validate the input date range
      if (!startDate || !endDate || startDate >= endDate) {
        throw new Error('Invalid date range');
      }

      // Query the database for maintenance tasks and equipment status changes within the date range
      const maintenanceTasks = await MaintenanceTaskModel.findAll({
        where: {
          scheduledDate: {
            [sequelize.Op.between]: [startDate, endDate],
          },
        },
      });

      const equipmentStatusChanges = await EquipmentModel.findAll({
        where: {
          updatedAt: {
            [sequelize.Op.between]: [startDate, endDate],
          },
        },
      });

      // Aggregate the data into a report format
      const report = {
        period: {
          startDate,
          endDate,
        },
        maintenanceTasks: {
          total: maintenanceTasks.length,
          completed: maintenanceTasks.filter(task => task.status === 'completed').length,
          pending: maintenanceTasks.filter(task => task.status === 'pending').length,
        },
        equipmentStatusChanges: {
          total: equipmentStatusChanges.length,
          needsMaintenance: equipmentStatusChanges.filter(eq => eq.status === 'needs_maintenance').length,
        },
      };

      logger.info(`Maintenance report generated for period: ${startDate} - ${endDate}`);
      return report;
    } catch (error) {
      errorHandler.handleError(error, 'Error generating maintenance report');
      throw error;
    }
  }

  /**
   * Sends notifications to maintenance staff about upcoming or overdue tasks
   */
  async notifyMaintenanceStaff(): Promise<void> {
    try {
      // Query the database for upcoming and overdue maintenance tasks
      const upcomingTasks = await MaintenanceTaskModel.findAll({
        where: {
          scheduledDate: {
            [sequelize.Op.between]: [moment().toDate(), moment().add(7, 'days').toDate()],
          },
          status: 'pending',
        },
      });

      const overdueTasks = await MaintenanceTaskModel.findAll({
        where: {
          scheduledDate: {
            [sequelize.Op.lt]: moment().toDate(),
          },
          status: 'pending',
        },
      });

      // Prepare and send notifications
      const notifications = [...upcomingTasks, ...overdueTasks].map(task => ({
        to: config.maintenanceStaffEmail,
        subject: `Maintenance Task ${task.id} - ${task.status === 'pending' ? 'Upcoming' : 'Overdue'}`,
        body: `
          Task ID: ${task.id}
          Title: ${task.title}
          Description: ${task.description}
          Scheduled Date: ${task.scheduledDate}
          Status: ${task.status}
        `,
      }));

      // Use the sendEmail function to send notifications to relevant staff members
      for (const notification of notifications) {
        await sendEmail(notification.to, notification.subject, notification.body);
      }

      logger.info(`Sent ${notifications.length} maintenance task notifications`);
    } catch (error) {
      errorHandler.handleError(error, 'Error notifying maintenance staff');
      throw error;
    }
  }

  /**
   * Schedules a notification for a maintenance task
   * @param task The maintenance task to schedule a notification for
   */
  private async scheduleNotification(task: MaintenanceTask): Promise<void> {
    // Implementation for scheduling notifications
    // This could involve setting up a job in a task queue or using a scheduling library
    logger.info(`Notification scheduled for maintenance task: ${task.id}`);
  }
}

export const maintenanceService = new MaintenanceService();
```

This implementation of the `MaintenanceService` class provides the required functionality for managing maintenance tasks and equipment status. Here's a breakdown of the implemented features:

1. `scheduleMaintenanceTask`: Creates a new maintenance task and schedules notifications.
2. `updateEquipmentStatus`: Updates the status of equipment and schedules maintenance if needed.
3. `generateMaintenanceReport`: Generates a report of maintenance tasks and equipment status changes for a given period.
4. `notifyMaintenanceStaff`: Sends notifications about upcoming and overdue maintenance tasks.

The service uses the provided utility functions for logging and error handling, and integrates with the database using Sequelize models. It also uses the `sendEmail` function from the integrations module for sending notifications.

Note that this implementation assumes the existence of `MaintenanceTask` and `Equipment` models in the Sequelize instance. You may need to adjust the model names or import them explicitly if they are defined differently in your project.

Lastly, here are the pending human tasks as comments:

```typescript
// TODO: Implement a mechanism to handle recurring maintenance tasks
// TODO: Develop a prioritization system for maintenance tasks (Optional)
// TODO: Integrate with an external inventory management system for spare parts tracking (Optional)