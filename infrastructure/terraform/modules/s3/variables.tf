variable "bucket_name" {
  type        = string
  description = "The name of the S3 bucket to be created"
  default     = null
}

variable "environment" {
  type        = string
  description = "The deployment environment (e.g., 'dev', 'staging', 'prod')"
  default     = "dev"
}

variable "project_name" {
  type        = string
  description = "The name of the project, used as a prefix for the S3 bucket name"
  default     = "ice-rink-mgmt"
}

# Additional variables for fine-tuning S3 bucket configuration

variable "versioning_enabled" {
  type        = bool
  description = "Enable versioning for the S3 bucket"
  default     = true
}

variable "encryption_enabled" {
  type        = bool
  description = "Enable server-side encryption for the S3 bucket"
  default     = true
}

variable "lifecycle_rule_enabled" {
  type        = bool
  description = "Enable lifecycle rules for the S3 bucket"
  default     = false
}

variable "lifecycle_rule_expiration_days" {
  type        = number
  description = "Number of days after which objects should be deleted (if lifecycle rules are enabled)"
  default     = 90
}

variable "tags" {
  type        = map(string)
  description = "A map of tags to add to the S3 bucket"
  default     = {}
}

# Human tasks (commented out as requested in the specification)
# TODO: Review and adjust variable defaults and descriptions based on specific project requirements
# TODO: Consider adding additional variables for fine-tuning S3 bucket configuration (e.g., versioning, lifecycle rules)