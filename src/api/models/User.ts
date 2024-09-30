import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserRole } from '../types/index';
import databaseConfig from '../config/database';
import { User, UserPreferences, UserAuthInfo } from '../../shared/types/user';

const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

class UserModel extends Model<User> {
  public id!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: UserRole;
  public dateOfBirth!: Date;
  public phoneNumber!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static initialize(sequelize: Sequelize): typeof UserModel {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(UserRole)),
          allowNull: false,
        },
        dateOfBirth: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
      }
    );

    return this;
  }

  public static async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  public static async createUser(userData: User, password: string): Promise<User> {
    const transaction = await databaseConfig.transaction();

    try {
      const hashedPassword = await hashPassword(password);

      const user = await this.create(userData, { transaction });

      await UserPreferences.create({ userId: user.id }, { transaction });
      await UserAuthInfo.create({ userId: user.id, passwordHash: hashedPassword }, { transaction });

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  public static async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const user = await this.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user.update(updates);
  }

  public static async deleteUser(userId: string): Promise<boolean> {
    const user = await this.findByPk(userId);
    if (!user) {
      return false;
    }

    const transaction = await databaseConfig.transaction();

    try {
      await UserPreferences.destroy({ where: { userId }, transaction });
      await UserAuthInfo.destroy({ where: { userId }, transaction });
      await user.destroy({ transaction });

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export { UserModel, hashPassword };

// TODO: Implement password reset functionality
// TODO: Add email verification process for new user registrations
// TODO: Implement multi-factor authentication setup and verification
// TODO: Review and enhance data validation for user input