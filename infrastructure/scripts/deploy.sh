#!/bin/bash

# Ice Rink Management and Booking System Deployment Script

# Set error handling
set -e

# Function to check dependencies
check_dependencies() {
    echo "Checking dependencies..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        echo "Error: Docker is not installed. Please install Docker and try again."
        exit 1
    fi

    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        echo "Error: Docker Compose is not installed. Please install Docker Compose and try again."
        exit 1
    fi

    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        echo "Error: AWS CLI is not installed. Please install AWS CLI and try again."
        exit 1
    fi

    echo "All dependencies are installed."
}

# Function to backup database
backup_database() {
    echo "Creating database backup..."
    
    if ! ./backup-database.sh; then
        echo "Error: Database backup failed. Aborting deployment."
        exit 1
    fi

    echo "Database backup completed successfully."
}

# Function to pull latest changes
pull_latest_changes() {
    echo "Pulling latest changes from git repository..."
    
    cd "$(dirname "$0")/../.." || exit
    if ! git pull origin main; then
        echo "Error: Failed to pull latest changes. Aborting deployment."
        exit 1
    fi

    echo "Latest changes pulled successfully."
}

# Function to build and deploy
build_and_deploy() {
    echo "Building and deploying services..."
    
    cd "$(dirname "$0")/../docker" || exit
    
    if ! docker-compose build; then
        echo "Error: Docker Compose build failed. Aborting deployment."
        exit 1
    fi

    if ! docker-compose up -d; then
        echo "Error: Docker Compose up failed. Aborting deployment."
        exit 1
    fi

    # Check if all services are running
    if ! docker-compose ps | grep -q "Up"; then
        echo "Error: One or more services failed to start. Aborting deployment."
        exit 1
    fi

    echo "Services built and deployed successfully."
}

# Function to run database migrations
run_database_migrations() {
    echo "Running database migrations..."
    
    # Assuming the API container is named 'api'
    if ! docker-compose exec api npm run migrate; then
        echo "Error: Database migrations failed. Aborting deployment."
        exit 1
    fi

    echo "Database migrations completed successfully."
}

# Function to perform health checks
health_check() {
    echo "Performing health checks..."
    
    # Assuming health check endpoints
    local api_health_url="http://localhost:3000/api/health"
    local frontend_health_url="http://localhost:8080/health"
    local backend_health_url="http://localhost:5000/health"

    if ! curl -sSf "$api_health_url" > /dev/null; then
        echo "Error: API health check failed. Aborting deployment."
        exit 1
    fi

    if ! curl -sSf "$frontend_health_url" > /dev/null; then
        echo "Error: Frontend health check failed. Aborting deployment."
        exit 1
    fi

    if ! curl -sSf "$backend_health_url" > /dev/null; then
        echo "Error: Backend health check failed. Aborting deployment."
        exit 1
    fi

    echo "All health checks passed successfully."
}

# Function to update load balancer
update_load_balancer() {
    echo "Updating load balancer configuration..."
    
    # Assuming we're using AWS ELB
    local elb_name="ice-rink-elb"
    
    if ! aws elb describe-load-balancers --load-balancer-names "$elb_name" &> /dev/null; then
        echo "Load balancer $elb_name doesn't exist. Skipping update."
        return 0
    fi

    if ! aws elb register-instances-with-load-balancer --load-balancer-name "$elb_name" --instances $(docker-compose ps -q); then
        echo "Error: Failed to update load balancer. Aborting deployment."
        exit 1
    fi

    echo "Load balancer updated successfully."
}

# Function to perform cleanup
cleanup() {
    echo "Performing post-deployment cleanup..."
    
    # Remove old Docker images
    docker image prune -af

    # Clean up temporary files
    rm -rf /tmp/deployment_*

    echo "Cleanup completed successfully."
}

# Main execution flow
main() {
    echo "Starting deployment process for Ice Rink Management and Booking System..."

    check_dependencies
    backup_database
    pull_latest_changes
    build_and_deploy
    run_database_migrations
    health_check
    update_load_balancer
    cleanup

    echo "Deployment completed successfully!"
}

# Run the main function
main

# Pending human tasks (commented out for production use)
: <<'HUMAN_TASKS'
Human tasks to be addressed:
1. [Required] Implement proper error handling and logging throughout the script
2. [Required] Add rollback functionality in case of deployment failure
3. [Optional] Implement notifications (e.g., Slack, email) for deployment status
4. [Required] Add support for different deployment environments (dev, staging, prod)
5. [Critical] Implement secrets management for sensitive information
6. [Optional] Add performance testing step after deployment
7. [Optional] Implement blue-green deployment strategy
HUMAN_TASKS