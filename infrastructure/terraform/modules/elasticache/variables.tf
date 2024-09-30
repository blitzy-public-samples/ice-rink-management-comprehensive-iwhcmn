variable "cluster_name" {
  type        = string
  description = "The name of the ElastiCache cluster"
}

variable "node_type" {
  type        = string
  description = "The compute and memory capacity of the nodes in the ElastiCache cluster"
  default     = "cache.t3.micro"
}

variable "num_cache_nodes" {
  type        = number
  description = "The number of cache nodes in the ElastiCache cluster"
  default     = 1
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of subnet IDs where the ElastiCache cluster will be deployed"
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC where the ElastiCache cluster will be deployed"
}

variable "allowed_cidr_blocks" {
  type        = list(string)
  description = "List of CIDR blocks allowed to access the ElastiCache cluster"
}

variable "environment" {
  type        = string
  description = "The deployment environment (e.g., dev, staging, prod)"
  default     = "dev"
}

# Additional variables for Redis-specific settings (optional)
variable "engine_version" {
  type        = string
  description = "The version number of the Redis engine"
  default     = "6.x"
}

variable "parameter_group_name" {
  type        = string
  description = "The name of the parameter group to associate with this cache cluster"
  default     = "default.redis6.x"
}

variable "port" {
  type        = number
  description = "The port number on which the cache accepts connections"
  default     = 6379
}

variable "snapshot_retention_limit" {
  type        = number
  description = "The number of days for which ElastiCache will retain automatic cache cluster snapshots"
  default     = 0
}

variable "snapshot_window" {
  type        = string
  description = "The daily time range during which automated backups are created"
  default     = "05:00-09:00"
}

variable "maintenance_window" {
  type        = string
  description = "The weekly time range for system maintenance"
  default     = "sun:05:00-sun:09:00"
}

variable "apply_immediately" {
  type        = bool
  description = "Specifies whether any modifications are applied immediately, or during the next maintenance window"
  default     = false
}

variable "at_rest_encryption_enabled" {
  type        = bool
  description = "Whether to enable encryption at rest"
  default     = true
}

variable "transit_encryption_enabled" {
  type        = bool
  description = "Whether to enable encryption in transit"
  default     = true
}

# Tags
variable "tags" {
  type        = map(string)
  description = "A map of tags to add to all resources"
  default     = {}
}

# Human tasks (commented)
# TODO: Review and adjust default values for node_type and num_cache_nodes based on expected load and performance requirements
# TODO: Ensure that the allowed_cidr_blocks are correctly set to restrict access to the ElastiCache cluster
# TODO: Consider adding additional variables for configuring Redis-specific settings if needed