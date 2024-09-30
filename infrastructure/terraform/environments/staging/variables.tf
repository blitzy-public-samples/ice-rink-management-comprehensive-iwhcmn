variable "environment" {
  type        = string
  description = "Name of the environment"
  default     = "staging"
}

variable "project_name" {
  type        = string
  description = "Name of the project, used as a prefix for resource naming"
  default     = "ice-rink-system-staging"
}

variable "aws_region" {
  type        = string
  description = "AWS region where resources will be created"
  default     = "us-west-2"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
  default     = "10.1.0.0/16"
}

variable "availability_zones" {
  type        = list(string)
  description = "List of availability zones in the region"
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for private subnets"
  default     = ["10.1.1.0/24", "10.1.2.0/24", "10.1.3.0/24"]
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for public subnets"
  default     = ["10.1.101.0/24", "10.1.102.0/24", "10.1.103.0/24"]
}

variable "ec2_instance_type" {
  type        = string
  description = "EC2 instance type for application servers"
  default     = "t3.small"
}

variable "rds_instance_class" {
  type        = string
  description = "RDS instance class for the database"
  default     = "db.t3.small"
}

variable "elasticache_node_type" {
  type        = string
  description = "ElastiCache node type for Redis"
  default     = "cache.t3.small"
}

variable "min_capacity" {
  type        = number
  description = "Minimum number of EC2 instances in the Auto Scaling group"
  default     = 2
}

variable "max_capacity" {
  type        = number
  description = "Maximum number of EC2 instances in the Auto Scaling group"
  default     = 4
}

# TODO: Review and adjust default values for variables based on staging environment requirements
# TODO: Ensure the AWS region and availability zones are appropriate for the staging environment
# TODO: Verify that the CIDR blocks for VPC and subnets do not conflict with existing network configurations in the staging environment
# TODO: Adjust instance types and sizes based on expected staging workload and performance requirements
# TODO: Review and adjust Auto Scaling group capacity settings based on expected staging traffic patterns
# TODO: Consider adding staging-specific variables such as monitoring intensity or backup frequency