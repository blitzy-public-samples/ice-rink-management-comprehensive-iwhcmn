import { describe, expect, test, jest, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { CacheService } from '../../../src/services/cacheService';
import { createRedisClient } from '../../../src/config/redis';
import { RedisClient } from 'redis';

jest.mock('../../../src/config/redis');

describe('CacheService', () => {
  let cacheService: CacheService;
  let mockRedisClient: jest.Mocked<RedisClient>;

  beforeAll(() => {
    // Mock the createRedisClient function to return a mock Redis client
    mockRedisClient = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      quit: jest.fn(),
    } as unknown as jest.Mocked<RedisClient>;

    (createRedisClient as jest.Mock).mockReturnValue(mockRedisClient);
  });

  afterAll(() => {
    // Clear all mock functions
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // Create a new instance of CacheService for each test
    cacheService = new CacheService();
  });

  test('should set a value in the cache', async () => {
    const key = 'testKey';
    const value = 'testValue';
    const expirationInSeconds = 3600;

    mockRedisClient.set.mockImplementation((k, v, ex, s, cb) => {
      cb(null, 'OK');
    });

    await expect(cacheService.set(key, value, expirationInSeconds)).resolves.toBeUndefined();
    expect(mockRedisClient.set).toHaveBeenCalledWith(key, value, 'EX', expirationInSeconds, expect.any(Function));
  });

  test('should get a value from the cache', async () => {
    const key = 'testKey';
    const value = 'testValue';

    mockRedisClient.get.mockImplementation((k, cb) => {
      cb(null, value);
    });

    await expect(cacheService.get(key)).resolves.toBe(value);
    expect(mockRedisClient.get).toHaveBeenCalledWith(key, expect.any(Function));
  });

  test('should delete a value from the cache', async () => {
    const key = 'testKey';

    mockRedisClient.del.mockImplementation((k, cb) => {
      cb(null, 1);
    });

    await expect(cacheService.delete(key)).resolves.toBeUndefined();
    expect(mockRedisClient.del).toHaveBeenCalledWith(key, expect.any(Function));
  });

  test('should handle errors when setting a value', async () => {
    const key = 'testKey';
    const value = 'testValue';
    const expirationInSeconds = 3600;

    mockRedisClient.set.mockImplementation((k, v, ex, s, cb) => {
      cb(new Error('Redis error'), null);
    });

    await expect(cacheService.set(key, value, expirationInSeconds)).rejects.toThrow('Redis error');
  });

  test('should handle errors when getting a value', async () => {
    const key = 'testKey';

    mockRedisClient.get.mockImplementation((k, cb) => {
      cb(new Error('Redis error'), null);
    });

    await expect(cacheService.get(key)).rejects.toThrow('Redis error');
  });

  test('should handle errors when deleting a value', async () => {
    const key = 'testKey';

    mockRedisClient.del.mockImplementation((k, cb) => {
      cb(new Error('Redis error'), 0);
    });

    await expect(cacheService.delete(key)).rejects.toThrow('Redis error');
  });
});