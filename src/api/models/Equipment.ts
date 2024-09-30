import { Model, DataTypes, Sequelize } from 'sequelize';

@Table({ tableName: 'equipment' })
class Equipment extends Model {
  public id!: number;
  public name!: string;
  public type!: string;
  public quantity!: number;
  public status!: string;
  public rinkId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Creates an instance of Equipment.
   * @param {object} attributes - The attributes to initialize the Equipment instance with.
   */
  constructor(attributes: any) {
    super(attributes);
    // Initialize any additional instance properties if needed
  }

  /**
   * Define associations with other models
   * @param {object} models - The models object containing all defined models
   */
  static associate(models: any): void {
    // Define a belongsTo association with the Rink model
    Equipment.belongsTo(models.Rink, {
      foreignKey: 'rinkId',
      as: 'rink',
    });

    // Define any other necessary associations (e.g., with Booking model for equipment rentals)
    Equipment.belongsToMany(models.Booking, {
      through: 'EquipmentRental',
      as: 'bookings',
      foreignKey: 'equipmentId',
    });
  }

  /**
   * Define the model schema
   * @param {Sequelize} sequelize - The Sequelize instance
   */
  static initModel(sequelize: Sequelize): void {
    Equipment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rinkId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'rinks',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Equipment',
        tableName: 'equipment',
        timestamps: true,
      }
    );
  }
}

export default Equipment;

// Human tasks:
// 1. Review and adjust the Equipment model properties to ensure they match the exact requirements of the Ice Rink Management and Booking System
// 2. Implement any additional methods or validations specific to the Equipment model
// 3. Ensure proper error handling and data validation in the model