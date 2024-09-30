import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the Rink model class
@Table({ tableName: 'rinks' })
class Rink extends Model {
  public rink_id!: number;
  public name!: string;
  public address!: string;
  public capacity!: number;
  public contact_info!: string;
  public status!: string;

  // Define associations with other models
  public static associate(models: any): void {
    // Define association with IceSlot model (hasMany)
    Rink.hasMany(models.IceSlot, { foreignKey: 'rink_id', as: 'iceSlots' });

    // Define association with Equipment model (hasMany)
    Rink.hasMany(models.Equipment, { foreignKey: 'rink_id', as: 'equipment' });

    // Define association with Staff model (hasMany)
    Rink.hasMany(models.Staff, { foreignKey: 'rink_id', as: 'staff' });
  }
}

// Initialize the Rink model with Sequelize
export function initRinkModel(sequelize: Sequelize): typeof Rink {
  // Define the Rink model structure
  Rink.init(
    {
      rink_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contact_info: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['active', 'maintenance', 'closed']], // Ensure status is one of these values
        },
      },
    },
    {
      sequelize,
      modelName: 'Rink',
      timestamps: true, // Adds createdAt and updatedAt timestamps
    }
  );

  return Rink;
}

export default Rink;

// Human tasks:
// TODO: Review and confirm that all necessary fields for the Rink model are included
// TODO: Ensure that the associations with other models (IceSlot, Equipment, Staff) are correctly defined
// TODO: Verify that the status field includes all possible rink statuses (e.g., 'active', 'maintenance', 'closed')