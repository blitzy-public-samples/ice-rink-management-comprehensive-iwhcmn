# Name of the environment
variable "environment" {
  type        = string
  description = "Name of the environment"
  default     = "dev"
}

# Project name used as a prefix for resource naming
variable "project_name" {
  type        = string
  description = "Name of the project, used as a prefix for resource naming"
  default     = "ice-rink-system-dev"
}

# AWS region for resource creation
variable "aws_region" {
  type        = string
  description = "AWS region where resources will be created"
  default     = "us-west-2"
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
  default     = ["us-west-2a", "us-west-2b"]
}

# List of CIDR blocks for private subnets
variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for private subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

# List of CIDR blocks for public subnets
variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for public subnets"
  default     = ["10.0.101.0/24", "10.0.102.0/24"]
}

# EC2 instance type for application servers
variable "ec2_instance_type" {
  type        = string
  description = "EC2 instance type for application servers"
  default     = "t3.micro"
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

# TODO: Review and adjust default values for variables based on development environment requirements
# TODO: Ensure the AWS region and availability zones are appropriate for the development environment
# TODO: Verify that the CIDR blocks for VPC and subnets do not conflict with existing network configurations in the development environment
# TODO: Adjust instance types and sizes based on expected development workload and budget constraints
# TODO: Consider adding development-specific variables such as debug flags or feature toggles