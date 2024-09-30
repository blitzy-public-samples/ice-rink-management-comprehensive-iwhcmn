#!/bin/bash

# Ice Rink Management and Booking System - Environment Setup Script

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check dependencies
check_dependencies() {
    echo "Checking dependencies..."
    
    local missing_deps=()

    if ! command_exists docker; then
        missing_deps+=("Docker")
    fi

    if ! command_exists docker-compose; then
        missing_deps+=("Docker Compose")
    fi

    if ! command_exists aws; then
        missing_deps+=("AWS CLI")
    fi

    if ! command_exists terraform; then
        missing_deps+=("Terraform")
    fi

    if [ ${#missing_deps[@]} -ne 0 ]; then
        echo "Error: The following dependencies are missing:"
        for dep in "${missing_deps[@]}"; do
            echo "- $dep"
        done
        echo "Please install the missing dependencies and run the script again."
        exit 1
    fi

    echo "All dependencies are installed."
}

# Function to set up AWS credentials
setup_aws_credentials() {
    echo "Setting up AWS credentials..."
    
    read -p "Enter your AWS Access Key ID: " aws_access_key_id
    read -sp "Enter your AWS Secret Access Key: " aws_secret_access_key
    echo
    read -p "Enter your default AWS region: " aws_region

    aws configure set aws_access_key_id "$aws_access_key_id"
    aws configure set aws_secret_access_key "$aws_secret_access_key"
    aws configure set default.region "$aws_region"

    echo "Verifying AWS configuration..."
    if aws sts get-caller-identity &>/dev/null; then
        echo "AWS credentials configured successfully."
    else
        echo "Error: Failed to configure AWS credentials. Please check your inputs and try again."
        exit 1
    fi
}

# Function to initialize Terraform
initialize_terraform() {
    echo "Initializing Terraform..."
    
    cd infrastructure/terraform || exit 1
    if terraform init; then
        echo "Terraform initialized successfully."
    else
        echo "Error: Failed to initialize Terraform. Please check the error messages and try again."
        exit 1
    fi
    cd - || exit 1
}

# Function to create .env files
create_env_files() {
    echo "Creating .env files..."
    
    # API .env file
    cat << EOF > src/api/.env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/icerink_db
JWT_SECRET=your_jwt_secret_here
EOF

    # Frontend .env file
    cat << EOF > src/frontend/.env
REACT_APP_API_URL=http://localhost:3000/api
EOF

    # Backend .env file
    cat << EOF > src/backend/.env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/icerink_db
REDIS_URL=redis://localhost:6379
AWS_S3_BUCKET=your_s3_bucket_name
EOF

    # Mobile app .env file
    cat << EOF > src/mobile/.env
API_URL=http://localhost:3000/api
EOF

    echo ".env files created successfully."
}

# Function to set up the database
setup_database() {
    echo "Setting up the database..."
    
    # This is a placeholder. In a real-world scenario, you would use a proper database migration tool.
    echo "CREATE DATABASE IF NOT EXISTS icerink_db;" | docker-compose exec -T db psql -U postgres
    
    # Run migrations (placeholder command)
    echo "Running database migrations..."
    docker-compose run --rm api npm run migrate
    
    # Seed database (placeholder command)
    echo "Seeding the database..."
    docker-compose run --rm api npm run seed
}

# Function to set up local development environment
setup_local_development() {
    echo "Setting up local development environment..."
    
    # Install dependencies for API
    echo "Installing API dependencies..."
    (cd src/api && npm install)
    
    # Install dependencies for Frontend
    echo "Installing Frontend dependencies..."
    (cd src/frontend && npm install)
    
    # Install dependencies for Backend
    echo "Installing Backend dependencies..."
    (cd src/backend && npm install)
    
    # Install dependencies for Mobile app
    echo "Installing Mobile app dependencies..."
    (cd src/mobile && npm install)
    
    # Build Docker images
    echo "Building Docker images..."
    docker-compose build
}

# Function to configure CI/CD
configure_ci_cd() {
    echo "Configuring CI/CD pipeline..."
    
    # Set up GitHub Actions workflows
    mkdir -p .github/workflows
    cat << EOF > .github/workflows/main.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14.x'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
EOF

    echo "GitHub Actions workflow configured."
    
    # Configure deployment scripts (placeholder)
    echo "Configuring deployment scripts..."
    # Add your deployment script configuration here
    
    # Set up monitoring and alerting (placeholder)
    echo "Setting up monitoring and alerting..."
    # Add your monitoring and alerting configuration here
}

# Main execution flow
main() {
    echo "Starting environment setup for Ice Rink Management and Booking System..."
    
    check_dependencies
    setup_aws_credentials
    initialize_terraform
    create_env_files
    setup_database
    setup_local_development
    configure_ci_cd
    
    echo "Environment setup completed successfully!"
}

# Run the main function
main

# Pending human tasks:
# TODO: Implement proper error handling and logging throughout the script
# TODO: Add support for different deployment environments (dev, staging, prod)
# TODO: Implement secrets management for sensitive information
# TODO: Create documentation for manual steps or configurations required after script execution
# TODO: Implement a cleanup function to revert changes in case of setup failure
# TODO: Add validation checks for each step to ensure proper setup
# TODO: Implement a way to skip certain steps if they've already been completed