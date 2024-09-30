#!/bin/bash

# Ice Rink Management and Booking System
# Database Restoration Script

# Set up error handling and logging
set -e
exec 2>&1 > >(tee -a "/var/log/ice-rink-db-restore.log")

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Check for required environment variables
required_vars=("DB_HOST" "DB_PORT" "DB_NAME" "DB_USER" "DB_PASSWORD" "S3_BUCKET")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: Required environment variable $var is not set."
        exit 1
    fi
done

# Check for required dependencies
for cmd in psql pg_restore aws; do
    if ! command -v $cmd &> /dev/null; then
        echo "Error: $cmd is required but not installed. Please install it and try again."
        exit 1
    fi
done

# Function to list available backups
list_available_backups() {
    echo "Listing available backup files in S3 bucket: $S3_BUCKET"
    aws s3 ls "s3://$S3_BUCKET" | grep -E '\.dump$|\.sql$' | awk '{print $4}' | sort -r
}

# Function to download backup
download_backup() {
    local backup_file=$1
    local temp_dir=$(mktemp -d)
    local local_file="$temp_dir/$backup_file"

    echo "Downloading backup file: $backup_file"
    aws s3 cp "s3://$S3_BUCKET/$backup_file" "$local_file"

    # Verify the integrity of the downloaded file
    if [ ! -s "$local_file" ]; then
        echo "Error: Downloaded file is empty or does not exist."
        rm -rf "$temp_dir"
        exit 1
    fi

    echo "$local_file"
}

# Function to restore database
restore_database() {
    local backup_file_path=$1

    echo "Restoring database from: $backup_file_path"

    # Drop existing connections
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c "
        SELECT pg_terminate_backend(pid) 
        FROM pg_stat_activity 
        WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();"

    # Drop and recreate the database
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d postgres -c "
        DROP DATABASE IF EXISTS $DB_NAME;
        CREATE DATABASE $DB_NAME;"

    # Restore the database
    if [[ "$backup_file_path" == *.dump ]]; then
        pg_restore -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -v "$backup_file_path"
    elif [[ "$backup_file_path" == *.sql ]]; then
        psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$backup_file_path"
    else
        echo "Error: Unsupported backup file format."
        return 1
    fi

    # Verify the restoration
    if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1" > /dev/null 2>&1; then
        echo "Database restoration completed successfully."
        return 0
    else
        echo "Error: Database restoration failed."
        return 1
    fi
}

# Main execution flow
echo "Starting database restoration process..."

# List available backups
available_backups=$(list_available_backups)
if [ -z "$available_backups" ]; then
    echo "No backup files found in the S3 bucket."
    exit 1
fi

echo "Available backup files:"
echo "$available_backups"

# Prompt user to select a backup file
read -p "Enter the name of the backup file to restore: " selected_backup

# Download the selected backup
backup_file_path=$(download_backup "$selected_backup")

# Restore the database
if restore_database "$backup_file_path"; then
    echo "Database restoration completed successfully."
else
    echo "Database restoration failed."
    exit 1
fi

# Clean up temporary files
rm -rf "$(dirname "$backup_file_path")"

echo "Database restoration process finished."

# List of pending human tasks (commented out)
: <<'HUMAN_TASKS'
Pending human tasks:
1. Set up appropriate IAM roles and policies for S3 access (Required)
2. Configure environment variables in the deployment environment (Required)
3. Ensure database connection details are securely stored and accessible to this script (Required)
4. Implement proper access controls to limit who can run this script (Critical)
5. Create a documented procedure for when and how to use this restore script (Required)
HUMAN_TASKS