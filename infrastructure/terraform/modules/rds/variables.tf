variable "rds_identifier" {
  type        = string
  description = "Identifier for the RDS instance"
}

variable "postgres_version" {
  type        = string
  description = "Version of PostgreSQL to use"
  default     = "13.7"
}

variable "db_instance_class" {
  type        = string
  description = "The instance type of the RDS instance"
  default     = "db.t3.micro"
}

variable "allocated_storage" {
  type        = number
  description = "The allocated storage in gigabytes"
  default     = 20
}

variable "kms_key_arn" {
  type        = string
  description = "The ARN for the KMS encryption key"
}

variable "database_name" {
  type        = string
  description = "The name of the database to create when the RDS instance is created"
}

variable "database_username" {
  type        = string
  description = "Username for the master DB user"
}

variable "database_password" {
  type        = string
  description = "Password for the master DB user"
  sensitive   = true
}

variable "vpc_security_group_ids" {
  type        = list(string)
  description = "List of VPC security groups to associate with the RDS instance"
}

variable "maintenance_window" {
  type        = string
  description = "The window to perform maintenance in. Syntax: 'ddd:hh24:mi-ddd:hh24:mi'"
  default     = "Mon:00:00-Mon:03:00"
}

variable "backup_window" {
  type        = string
  description = "The daily time range (in UTC) during which automated backups are created if they are enabled"
  default     = "03:00-06:00"
}

variable "backup_retention_period" {
  type        = number
  description = "The days to retain backups for"
  default     = 7
}

variable "multi_az" {
  type        = bool
  description = "Specifies if the RDS instance is multi-AZ"
  default     = false
}

variable "apply_immediately" {
  type        = bool
  description = "Specifies whether any database modifications are applied immediately, or during the next maintenance window"
  default     = false
}

variable "environment" {
  type        = string
  description = "Environment name (e.g., 'dev', 'staging', 'prod')"
}

# TODO: Review and adjust default values for variables to match project requirements
# TODO: Ensure that sensitive variables like database_password are properly handled and not stored in plain text
# TODO: Determine if any additional variables are needed based on specific project requirements
# TODO: Validate that all variables used in main.tf are defined in this file