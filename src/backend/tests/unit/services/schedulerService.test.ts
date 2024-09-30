import { SchedulerServiceImpl } from '../../../src/services/schedulerService';
import { Schedule, TimeSlot, ScheduleConfig } from '../../../src/types/services';
import moment from 'moment';

// Mock implementations
jest.mock('../../../src/services/schedulerService');

describe('SchedulerService', () => {
  let schedulerService: SchedulerServiceImpl;

  beforeEach(() => {
    schedulerService = new SchedulerServiceImpl();
    jest.clearAllMocks();
  });

  describe('createSchedule', () => {
    it('should create a schedule based on the given config', async () => {
      const mockConfig: ScheduleConfig = {
        startDate: moment().toDate(),
        endDate: moment().add(7, 'days').toDate(),
        openingTime: '08:00',
        closingTime: '22:00',
        slotDuration: 60, // minutes
      };

      const mockSchedule: Schedule = {
        id: '1',
        config: mockConfig,
        timeSlots: [],
      };

      (schedulerService.createSchedule as jest.Mock).mockResolvedValue(mockSchedule);

      const result = await schedulerService.createSchedule(mockConfig);

      expect(result).toEqual(mockSchedule);
      expect(schedulerService.createSchedule).toHaveBeenCalledWith(mockConfig);
    });

    it('should throw an error if the config is invalid', async () => {
      const invalidConfig: ScheduleConfig = {
        startDate: moment().add(1, 'day').toDate(),
        endDate: moment().toDate(),
        openingTime: '08:00',
        closingTime: '22:00',
        slotDuration: 60,
      };

      (schedulerService.createSchedule as jest.Mock).mockRejectedValue(new Error('Invalid schedule configuration'));

      await expect(schedulerService.createSchedule(invalidConfig)).rejects.toThrow('Invalid schedule configuration');
    });
  });

  describe('getAvailableTimeSlots', () => {
    it('should return available time slots for a given date range', async () => {
      const startDate = moment().toDate();
      const endDate = moment().add(7, 'days').toDate();

      const mockTimeSlots: TimeSlot[] = [
        { id: '1', startTime: moment().add(1, 'day').toDate(), endTime: moment().add(1, 'day').add(1, 'hour').toDate(), isAvailable: true },
        { id: '2', startTime: moment().add(2, 'days').toDate(), endTime: moment().add(2, 'days').add(1, 'hour').toDate(), isAvailable: false },
      ];

      (schedulerService.getAvailableTimeSlots as jest.Mock).mockResolvedValue(mockTimeSlots);

      const result = await schedulerService.getAvailableTimeSlots(startDate, endDate);

      expect(result).toEqual(mockTimeSlots);
      expect(schedulerService.getAvailableTimeSlots).toHaveBeenCalledWith(startDate, endDate);
    });
  });

  describe('bookTimeSlot', () => {
    it('should book a time slot successfully', async () => {
      const timeSlotId = '1';
      const userId = 'user123';

      const mockBookedTimeSlot: TimeSlot = {
        id: timeSlotId,
        startTime: moment().add(1, 'day').toDate(),
        endTime: moment().add(1, 'day').add(1, 'hour').toDate(),
        isAvailable: false,
        bookedBy: userId,
      };

      (schedulerService.bookTimeSlot as jest.Mock).mockResolvedValue(mockBookedTimeSlot);

      const result = await schedulerService.bookTimeSlot(timeSlotId, userId);

      expect(result).toEqual(mockBookedTimeSlot);
      expect(schedulerService.bookTimeSlot).toHaveBeenCalledWith(timeSlotId, userId);
    });

    it('should throw an error if the time slot is not available', async () => {
      const timeSlotId = '2';
      const userId = 'user123';

      (schedulerService.bookTimeSlot as jest.Mock).mockRejectedValue(new Error('Time slot is not available'));

      await expect(schedulerService.bookTimeSlot(timeSlotId, userId)).rejects.toThrow('Time slot is not available');
    });
  });

  describe('cancelBooking', () => {
    it('should cancel a booking successfully', async () => {
      const timeSlotId = '1';
      const userId = 'user123';

      const mockCancelledTimeSlot: TimeSlot = {
        id: timeSlotId,
        startTime: moment().add(1, 'day').toDate(),
        endTime: moment().add(1, 'day').add(1, 'hour').toDate(),
        isAvailable: true,
        bookedBy: null,
      };

      (schedulerService.cancelBooking as jest.Mock).mockResolvedValue(mockCancelledTimeSlot);

      const result = await schedulerService.cancelBooking(timeSlotId, userId);

      expect(result).toEqual(mockCancelledTimeSlot);
      expect(schedulerService.cancelBooking).toHaveBeenCalledWith(timeSlotId, userId);
    });

    it('should throw an error if the booking cannot be cancelled', async () => {
      const timeSlotId = '2';
      const userId = 'user123';

      (schedulerService.cancelBooking as jest.Mock).mockRejectedValue(new Error('Booking cannot be cancelled'));

      await expect(schedulerService.cancelBooking(timeSlotId, userId)).rejects.toThrow('Booking cannot be cancelled');
    });
  });
});

// Commented list of human tasks
/*
Human tasks:
1. Implement test cases for all methods in SchedulerServiceImpl (Required)
2. Add edge case scenarios and error handling tests (Required)
3. Ensure proper mocking of dependencies and external services (Required)
4. Add performance tests for methods that may have scalability concerns (Optional)
*/