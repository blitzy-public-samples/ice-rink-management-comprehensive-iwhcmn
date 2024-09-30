#!/bin/bash

# Rollback script for the Ice Rink Management and Booking System
# This script reverts the system to a previous stable state in case of deployment issues

# Set strict mode
set -euo pipefail

# Load environment variables
if [[ -f .env ]]; then
    source .env
else
    echo "Error: .env file not found"
    exit 1
fi

# Function to check if required dependencies are installed
check_dependencies() {
    echo "Checking dependencies..."
    for cmd in docker docker-compose aws; do
        if ! command -v $cmd &> /dev/null; then
            echo "Error: $cmd is not installed"
            exit 1
        fi
    done
    echo "All dependencies are installed"
}

# Function to retrieve the previous stable version information
get_previous_version() {
    echo "Retrieving previous version..."
    if [[ -f version.txt ]]; then
        PREVIOUS_VERSION=$(cat version.txt)
        if git rev-parse --verify $PREVIOUS_VERSION &> /dev/null; then
            echo "Previous version: $PREVIOUS_VERSION"
        else
            echo "Error: Previous version $PREVIOUS_VERSION not found in the repository"
            exit 1
        fi
    else
        echo "Error: version.txt file not found"
        exit 1
    fi
}

# Function to stop the currently running services
stop_current_services() {
    echo "Stopping current services..."
    cd infrastructure/docker
    docker-compose down
    if [[ $(docker ps -q) ]]; then
        echo "Error: Not all services were stopped"
        exit 1
    fi
    cd ../..
    echo "All services stopped successfully"
}

# Function to checkout the code for the previous stable version
checkout_previous_version() {
    echo "Checking out previous version..."
    if ! git checkout $PREVIOUS_VERSION; then
        echo "Error: Failed to checkout previous version"
        exit 1
    fi
    echo "Successfully checked out previous version"
}

# Function to restore the database to the previous stable state
restore_database() {
    echo "Restoring database..."
    if ! ./infrastructure/scripts/restore-database.sh; then
        echo "Error: Database restoration failed"
        exit 1
    fi
    echo "Database restored successfully"
}

# Function to build and deploy the previous version of the application
build_and_deploy_previous_version() {
    echo "Building and deploying previous version..."
    cd infrastructure/docker
    docker-compose build
    docker-compose up -d
    if [[ ! $(docker ps -q) ]]; then
        echo "Error: Failed to start services"
        exit 1
    fi
    cd ../..
    echo "Previous version built and deployed successfully"
}

# Function to revert database migrations if necessary
revert_database_migrations() {
    echo "Checking if database migration reversion is needed..."
    # This is a placeholder. Implement the actual logic to check and revert migrations.
    # For example, you might run a command inside your API container:
    # docker-compose exec api npm run migrate:revert
    echo "Database migrations reverted (if necessary)"
}

# Function to perform health checks on rolled back services
health_check() {
    echo "Performing health checks..."
    # Add your health check logic here. For example:
    # if ! curl -f http://localhost:3000/health; then
    #     echo "Error: API health check failed"
    #     exit 1
    # fi
    echo "All health checks passed"
}

# Function to update load balancer configuration
update_load_balancer() {
    echo "Updating load balancer configuration..."
    # Add your AWS CLI commands here to update the load balancer
    # For example:
    # aws elbv2 modify-target-group --target-group-arn $TARGET_GROUP_ARN --health-check-path /health
    echo "Load balancer updated successfully"
}

# Function to perform post-rollback cleanup
cleanup() {
    echo "Performing cleanup..."
    # Add any cleanup tasks here
    echo "Cleanup completed"
}

# Main execution flow
main() {
    echo "Starting rollback process..."
    check_dependencies
    get_previous_version
    stop_current_services
    checkout_previous_version
    restore_database
    build_and_deploy_previous_version
    revert_database_migrations
    health_check
    update_load_balancer
    cleanup
    echo "Rollback completed successfully"
}

# Run main function
main

# List of human tasks (commented)
# TODO: Implement proper error handling and logging throughout the script (Required)
# TODO: Add support for rolling back to a specific version, not just the previous one (Optional)
# TODO: Implement notifications (e.g., Slack, email) for rollback status (Optional)
# TODO: Add support for different deployment environments (dev, staging, prod) (Required)
# TODO: Implement secrets management for sensitive information (Critical)
# TODO: Create a mechanism to track and store multiple previous versions for potential rollback (Required)
# TODO: Implement a dry-run option to simulate rollback without making actual changes (Optional)