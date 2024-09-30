import { Model, DataTypes, Sequelize } from 'sequelize';
import { BookingStatus } from '../types/index';
import { Booking } from '../../shared/types/booking';
import UserModel from './User';
import RinkModel from './Rink';

class BookingModel extends Model<Booking> {
  public id!: string;
  public userId!: string;
  public rinkId!: string;
  public startTime!: Date;
  public endTime!: Date;
  public status!: BookingStatus;
  public totalPrice!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static initialize(sequelize: Sequelize): typeof BookingModel {
    BookingModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        rinkId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Rinks',
            key: 'id',
          },
        },
        startTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(BookingStatus)),
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'bookings',
        timestamps: true,
      }
    );

    BookingModel.belongsTo(UserModel, { foreignKey: 'userId' });
    BookingModel.belongsTo(RinkModel, { foreignKey: 'rinkId' });

    return BookingModel;
  }

  public static async createBooking(bookingData: Booking): Promise<Booking> {
    // Validate booking data
    if (!this.validateBookingData(bookingData)) {
      throw new Error('Invalid booking data');
    }

    // Check for conflicting bookings
    const conflictingBooking = await this.findOne({
      where: {
        rinkId: bookingData.rinkId,
        [Sequelize.Op.or]: [
          {
            startTime: {
              [Sequelize.Op.between]: [bookingData.startTime, bookingData.endTime],
            },
          },
          {
            endTime: {
              [Sequelize.Op.between]: [bookingData.startTime, bookingData.endTime],
            },
          },
        ],
      },
    });

    if (conflictingBooking) {
      throw new Error('Conflicting booking exists');
    }

    // Create a new booking record in the database
    return await this.create(bookingData);
  }

  public static async updateBooking(bookingId: string, updates: Partial<Booking>): Promise<Booking> {
    // Find the booking by ID
    const booking = await this.findByPk(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Validate update data
    if (!this.validateBookingData(updates, true)) {
      throw new Error('Invalid update data');
    }

    // Update the booking's information
    await booking.update(updates);

    return booking;
  }

  public static async cancelBooking(bookingId: string): Promise<boolean> {
    // Find the booking by ID
    const booking = await this.findByPk(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    // Check if the booking can be cancelled
    if (booking.status === BookingStatus.CANCELLED) {
      throw new Error('Booking is already cancelled');
    }

    if (new Date(booking.startTime) < new Date()) {
      throw new Error('Cannot cancel a booking that has already started or ended');
    }

    // Update the booking status to cancelled
    await booking.update({ status: BookingStatus.CANCELLED });

    return true;
  }

  public static async findBookingsByUser(userId: string): Promise<Booking[]> {
    // Query the database for bookings with the given userId
    return await this.findAll({
      where: { userId },
      order: [['startTime', 'ASC']],
    });
  }

  public static async findBookingsByRink(rinkId: string, startDate: Date, endDate: Date): Promise<Booking[]> {
    // Query the database for bookings with the given rinkId and date range
    return await this.findAll({
      where: {
        rinkId,
        startTime: {
          [Sequelize.Op.between]: [startDate, endDate],
        },
      },
      order: [['startTime', 'ASC']],
    });
  }

  private static validateBookingData(data: Partial<Booking>, isUpdate: boolean = false): boolean {
    // Implement validation logic here
    // This is a basic implementation and should be expanded based on specific requirements
    if (!isUpdate) {
      if (!data.userId || !data.rinkId || !data.startTime || !data.endTime || !data.totalPrice) {
        return false;
      }
    }

    if (data.startTime && data.endTime && new Date(data.startTime) >= new Date(data.endTime)) {
      return false;
    }

    if (data.totalPrice && data.totalPrice < 0) {
      return false;
    }

    return true;
  }
}

export default BookingModel;

// Human tasks:
// TODO: Implement booking conflict resolution logic
// TODO: Add support for recurring bookings
// TODO: Implement booking reminder notifications
// TODO: Review and enhance booking cancellation policy