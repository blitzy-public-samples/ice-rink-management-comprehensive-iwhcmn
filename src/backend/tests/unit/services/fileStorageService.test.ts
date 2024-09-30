import { describe, expect, test, jest, beforeEach, afterEach } from '@jest/globals';
import AWS from 'aws-sdk-mock';
import { fileStorageService } from '../../../src/services/fileStorageService';
import { getS3Client } from '../../../src/config/aws';

jest.mock('../../../src/config/aws', () => ({
  getS3Client: jest.fn(),
}));

describe('fileStorageService', () => {
  beforeEach(() => {
    // Mock AWS SDK
    AWS.mock('S3', 'upload', (params: any, callback: Function) => {
      callback(null, { Location: 'https://example-bucket.s3.amazonaws.com/test-file.jpg' });
    });

    AWS.mock('S3', 'getObject', (params: any, callback: Function) => {
      callback(null, { Body: Buffer.from('test file content') });
    });

    AWS.mock('S3', 'deleteObject', (params: any, callback: Function) => {
      callback(null, {});
    });

    // Mock getS3Client
    (getS3Client as jest.Mock).mockReturnValue({
      upload: jest.fn().mockImplementation((params, callback) => {
        callback(null, { Location: 'https://example-bucket.s3.amazonaws.com/test-file.jpg' });
      }),
      getObject: jest.fn().mockImplementation((params, callback) => {
        callback(null, { Body: Buffer.from('test file content') });
      }),
      deleteObject: jest.fn().mockImplementation((params, callback) => {
        callback(null, {});
      }),
    });
  });

  afterEach(() => {
    AWS.restore('S3');
    jest.resetAllMocks();
  });

  test('uploadFile should upload a file to S3', async () => {
    const file = {
      buffer: Buffer.from('test file content'),
      originalname: 'test-file.jpg',
      mimetype: 'image/jpeg',
    };

    const result = await fileStorageService.uploadFile(file);

    expect(result).toBe('https://example-bucket.s3.amazonaws.com/test-file.jpg');
    expect(getS3Client).toHaveBeenCalled();
  });

  test('getFile should retrieve a file from S3', async () => {
    const fileKey = 'test-file.jpg';

    const result = await fileStorageService.getFile(fileKey);

    expect(result).toEqual(Buffer.from('test file content'));
    expect(getS3Client).toHaveBeenCalled();
  });

  test('deleteFile should remove a file from S3', async () => {
    const fileKey = 'test-file.jpg';

    await fileStorageService.deleteFile(fileKey);

    expect(getS3Client).toHaveBeenCalled();
  });

  test('uploadFile should handle errors', async () => {
    AWS.restore('S3');
    AWS.mock('S3', 'upload', (params: any, callback: Function) => {
      callback(new Error('Upload failed'), null);
    });

    const file = {
      buffer: Buffer.from('test file content'),
      originalname: 'test-file.jpg',
      mimetype: 'image/jpeg',
    };

    await expect(fileStorageService.uploadFile(file)).rejects.toThrow('Upload failed');
  });

  test('getFile should handle errors', async () => {
    AWS.restore('S3');
    AWS.mock('S3', 'getObject', (params: any, callback: Function) => {
      callback(new Error('File not found'), null);
    });

    const fileKey = 'non-existent-file.jpg';

    await expect(fileStorageService.getFile(fileKey)).rejects.toThrow('File not found');
  });

  test('deleteFile should handle errors', async () => {
    AWS.restore('S3');
    AWS.mock('S3', 'deleteObject', (params: any, callback: Function) => {
      callback(new Error('Delete failed'), null);
    });

    const fileKey = 'test-file.jpg';

    await expect(fileStorageService.deleteFile(fileKey)).rejects.toThrow('Delete failed');
  });
});