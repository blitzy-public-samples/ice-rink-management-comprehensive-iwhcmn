import { S3 } from 'aws-sdk';
import { getS3Client } from '../config/aws';
import { FileStorageServiceTypes } from '../types';

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

if (!S3_BUCKET_NAME) {
  throw new Error('S3_BUCKET_NAME environment variable is not set');
}

/**
 * Service responsible for handling file storage operations using AWS S3
 */
export class FileStorageService {
  private s3Client: S3;

  constructor() {
    this.s3Client = getS3Client();
  }

  /**
   * Uploads a file to the S3 bucket
   * @param params Upload file parameters
   * @returns A promise that resolves with the upload result
   */
  async uploadFile(params: FileStorageServiceTypes.UploadFileParams): Promise<FileStorageServiceTypes.UploadFileResult> {
    const uploadParams: S3.PutObjectRequest = {
      Bucket: S3_BUCKET_NAME,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType,
    };

    try {
      const result = await this.s3Client.upload(uploadParams).promise();
      return {
        key: result.Key,
        location: result.Location,
        eTag: result.ETag,
      };
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new Error('Failed to upload file');
    }
  }

  /**
   * Generates a pre-signed URL for accessing a file in the S3 bucket
   * @param key File key in the S3 bucket
   * @param expirationTimeInSeconds URL expiration time in seconds
   * @returns A promise that resolves with the pre-signed URL
   */
  async getFileUrl(key: string, expirationTimeInSeconds: number): Promise<string> {
    const params: S3.GetSignedUrlRequest = {
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Expires: expirationTimeInSeconds,
    };

    try {
      return await this.s3Client.getSignedUrlPromise('getObject', params);
    } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      throw new Error('Failed to generate file URL');
    }
  }

  /**
   * Deletes a file from the S3 bucket
   * @param key File key in the S3 bucket
   * @returns A promise that resolves when the file is deleted
   */
  async deleteFile(key: string): Promise<void> {
    const params: S3.DeleteObjectRequest = {
      Bucket: S3_BUCKET_NAME,
      Key: key,
    };

    try {
      await this.s3Client.deleteObject(params).promise();
    } catch (error) {
      console.error('Error deleting file from S3:', error);
      throw new Error('Failed to delete file');
    }
  }

  /**
   * Lists files in the S3 bucket with optional prefix
   * @param prefix Optional prefix to filter files
   * @returns A promise that resolves with the list of files
   */
  async listFiles(prefix?: string): Promise<FileStorageServiceTypes.ListFilesResult> {
    const params: S3.ListObjectsV2Request = {
      Bucket: S3_BUCKET_NAME,
      Prefix: prefix,
    };

    try {
      const result = await this.s3Client.listObjectsV2(params).promise();
      return {
        files: result.Contents?.map(item => ({
          key: item.Key || '',
          lastModified: item.LastModified,
          size: item.Size,
          eTag: item.ETag,
        })) || [],
        nextContinuationToken: result.NextContinuationToken,
      };
    } catch (error) {
      console.error('Error listing files from S3:', error);
      throw new Error('Failed to list files');
    }
  }
}

// Human tasks:
// TODO: Implement proper error handling for S3 operations
// TODO: Add file type validation before upload to ensure only allowed file types are stored
// TODO: Implement file size limits for uploads to prevent abuse
// TODO: Add logging for all file operations for auditing purposes
// TODO: Implement a mechanism to handle S3 bucket versioning if required