# Project name, used as a prefix for resource naming
variable "project_name" {
  type        = string
  description = "Name of the project, used as a prefix for resource naming"
  default     = "ice-rink-system"
}

# AWS region where resources will be created
variable "aws_region" {
  type        = string
  description = "AWS region where resources will be created"
  default     = "us-west-2"
}

# AWS CLI profile to use for authentication
variable "aws_profile" {
  type        = string
  description = "AWS CLI profile to use for authentication"
  default     = "default"
}

# CIDR block for the VPC
variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

# List of availability zones in the region
variable "availability_zones" {
  type        = list(string)
  description = "List of availability zones in the region"
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

# List of CIDR blocks for private subnets
variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for private subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

# List of CIDR blocks for public subnets
variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for public subnets"
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

# EC2 instance type for application servers
variable "ec2_instance_type" {
  type        = string
  description = "EC2 instance type for application servers"
  default     = "t3.micro"
}

# Name of the EC2 key pair to use for SSH access
variable "ec2_key_name" {
  type        = string
  description = "Name of the EC2 key pair to use for SSH access"
  default     = null
}

# RDS instance class for the database
variable "rds_instance_class" {
  type        = string
  description = "RDS instance class for the database"
  default     = "db.t3.micro"
}

# ElastiCache node type for Redis
variable "elasticache_node_type" {
  type        = string
  description = "ElastiCache node type for Redis"
  default     = "cache.t3.micro"
}

# Path to the Lambda function deployment package
variable "lambda_payload_file" {
  type        = string
  description = "Path to the Lambda function deployment package"
  default     = "lambda_function.zip"
}

# Human tasks (commented out as requested in the file)
# TODO: Review and adjust default values for variables based on specific project requirements
# TODO: Ensure the AWS region and availability zones are appropriate for the project's needs
# TODO: Create and specify the correct EC2 key pair name for SSH access
# TODO: Verify that the CIDR blocks for VPC and subnets do not conflict with existing network configurations
# TODO: Adjust instance types and sizes based on expected workload and budget constraints
# TODO: Ensure the Lambda payload file path is correct and the file exists