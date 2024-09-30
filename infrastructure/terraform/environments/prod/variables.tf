variable "project_name" {
  type        = string
  description = "Name of the project, used as a prefix for resource naming"
  default     = "ice-rink-system-prod"
}

variable "aws_region" {
  type        = string
  description = "AWS region where resources will be created"
  default     = "us-west-2"
}

variable "aws_profile" {
  type        = string
  description = "AWS CLI profile to use for authentication"
  default     = "prod"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  type        = list(string)
  description = "List of availability zones in the region"
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for private subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for public subnets"
  default     = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}

variable "ec2_instance_type" {
  type        = string
  description = "EC2 instance type for application servers"
  default     = "t3.medium"
}

variable "ec2_key_name" {
  type        = string
  description = "Name of the EC2 key pair to use for SSH access"
  default     = "ice-rink-prod-key"
}

variable "rds_instance_class" {
  type        = string
  description = "RDS instance class for the database"
  default     = "db.t3.medium"
}

variable "elasticache_node_type" {
  type        = string
  description = "ElastiCache node type for Redis"
  default     = "cache.t3.medium"
}

variable "lambda_payload_file" {
  type        = string
  description = "Path to the Lambda function deployment package"
  default     = "../../../lambda/function.zip"
}

variable "min_capacity" {
  type        = number
  description = "Minimum number of EC2 instances in the Auto Scaling group"
  default     = 2
}

variable "max_capacity" {
  type        = number
  description = "Maximum number of EC2 instances in the Auto Scaling group"
  default     = 10
}

variable "rds_multi_az" {
  type        = bool
  description = "Enable Multi-AZ deployment for RDS"
  default     = true
}

variable "backup_retention_period" {
  type        = number
  description = "Number of days to retain backups for RDS"
  default     = 30
}

variable "domain_name" {
  type        = string
  description = "Domain name for the production environment"
  default     = "icerink-prod.example.com"
}

# TODO: Review and adjust default values for production-specific variables
# TODO: Ensure the AWS region and availability zones are appropriate for the production environment
# TODO: Verify that the CIDR blocks for VPC and subnets do not conflict with existing network configurations
# TODO: Confirm that the EC2 instance types, RDS instance class, and ElastiCache node type are suitable for production workloads
# TODO: Create and specify the correct EC2 key pair name for production SSH access
# TODO: Adjust Auto Scaling group capacity limits based on expected production traffic
# TODO: Set up the correct domain name for the production environment
# TODO: Ensure the Lambda payload file path is correct and the file exists
# TODO: Review and potentially increase the backup retention period for production data