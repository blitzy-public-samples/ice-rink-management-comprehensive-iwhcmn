import { RedisClient } from 'redis';

// Define the CacheServiceType interface
interface CacheServiceType {
  set(key: string, value: any, expirationInSeconds?: number): Promise<void>;
  get(key: string): Promise<any>;
  del(key: string): Promise<void>;
  flushAll(): Promise<void>;
}

class CacheService implements CacheServiceType {
  private client: RedisClient;

  constructor() {
    // Assume createRedisClient is implemented elsewhere in the project
    this.client = createRedisClient();
  }

  async set(key: string, value: any, expirationInSeconds?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (expirationInSeconds) {
        await new Promise<void>((resolve, reject) => {
          this.client.setex(key, expirationInSeconds, serializedValue, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      } else {
        await new Promise<void>((resolve, reject) => {
          this.client.set(key, serializedValue, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
    } catch (error) {
      console.error('Error setting cache:', error);
      throw new Error('Failed to set cache');
    }
  }

  async get(key: string): Promise<any> {
    try {
      const value = await new Promise<string | null>((resolve, reject) => {
        this.client.get(key, (err, reply) => {
          if (err) reject(err);
          else resolve(reply);
        });
      });

      if (value) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error('Error getting cache:', error);
      throw new Error('Failed to get cache');
    }
  }

  async del(key: string): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        this.client.del(key, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } catch (error) {
      console.error('Error deleting cache:', error);
      throw new Error('Failed to delete cache');
    }
  }

  async flushAll(): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        this.client.flushall((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } catch (error) {
      console.error('Error flushing cache:', error);
      throw new Error('Failed to flush cache');
    }
  }
}

export default CacheService;

// TODO: Implement error handling for specific Redis-related errors
// TODO: Add unit tests for CacheService methods
// TODO: Consider implementing a cache prefix system to avoid key collisions between different parts of the application
// TODO: Evaluate and implement cache invalidation strategies for complex data structures