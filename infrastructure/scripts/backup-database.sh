#!/bin/bash

# Ice Rink Management and Booking System
# Database Backup Script

# Set up error handling and logging
set -e
exec 2>&1

# Load environment variables
DB_HOST="${DB_HOST}"
DB_PORT="${DB_PORT}"
DB_NAME="${DB_NAME}"
DB_USER="${DB_USER}"
DB_PASSWORD="${DB_PASSWORD}"
S3_BUCKET="${S3_BUCKET}"
BACKUP_RETENTION_DAYS=30

# Check for required dependencies
command -v pg_dump >/dev/null 2>&1 || { echo >&2 "PostgreSQL client is required but not installed. Aborting."; exit 1; }
command -v aws >/dev/null 2>&1 || { echo >&2 "AWS CLI is required but not installed. Aborting."; exit 1; }

# Function to perform database backup
perform_backup() {
    echo "Starting database backup process..."
    
    # Generate timestamp for the backup file
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    BACKUP_FILE="ice_rink_db_backup_${TIMESTAMP}.sql.gz"
    
    # Use pg_dump to create a compressed backup of the database
    PGPASSWORD="${DB_PASSWORD}" pg_dump -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" | gzip > "${BACKUP_FILE}"
    
    if [ $? -eq 0 ]; then
        echo "Database backup created successfully: ${BACKUP_FILE}"
        
        # Upload the backup file to the specified S3 bucket
        aws s3 cp "${BACKUP_FILE}" "s3://${S3_BUCKET}/${BACKUP_FILE}"
        
        if [ $? -eq 0 ]; then
            echo "Backup file uploaded to S3 successfully"
            # Remove the local backup file after successful upload
            rm "${BACKUP_FILE}"
            echo "Local backup file removed"
            return 0
        else
            echo "Failed to upload backup file to S3"
            return 1
        fi
    else
        echo "Failed to create database backup"
        return 1
    fi
}

# Function to clean up old backups
cleanup_old_backups() {
    echo "Starting cleanup of old backups..."
    
    # List all backup files in the S3 bucket
    BACKUP_FILES=$(aws s3 ls "s3://${S3_BUCKET}/" | grep 'ice_rink_db_backup_' | awk '{print $4}')
    
    # Get the current date in seconds since epoch
    CURRENT_DATE=$(date +%s)
    
    for file in $BACKUP_FILES; do
        # Extract the date from the filename
        FILE_DATE=$(echo $file | grep -oP '\d{8}')
        FILE_DATE_SECONDS=$(date -d "${FILE_DATE}" +%s)
        
        # Calculate the difference in days
        DIFF_DAYS=$(( ($CURRENT_DATE - $FILE_DATE_SECONDS) / 86400 ))
        
        # If the file is older than BACKUP_RETENTION_DAYS, delete it
        if [ $DIFF_DAYS -gt $BACKUP_RETENTION_DAYS ]; then
            echo "Deleting old backup: $file"
            aws s3 rm "s3://${S3_BUCKET}/${file}"
        fi
    done
    
    echo "Cleanup of old backups completed"
    return 0
}

# Main execution flow
echo "Starting Ice Rink Management and Booking System database backup script"

# Perform backup
if perform_backup; then
    echo "Backup process completed successfully"
else
    echo "Backup process failed"
    exit 1
fi

# Clean up old backups
if cleanup_old_backups; then
    echo "Cleanup process completed successfully"
else
    echo "Cleanup process failed"
    exit 1
fi

echo "Database backup and cleanup processes completed successfully"

# List of pending human tasks:
# - Set up appropriate IAM roles and policies for S3 access
# - Configure environment variables in the deployment environment
# - Set up a scheduled job (e.g., cron) to run this script regularly

exit 0