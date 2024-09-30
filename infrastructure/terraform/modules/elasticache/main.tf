# This module provisions an Amazon ElastiCache cluster for Redis, used as a caching layer in the Ice Rink Management and Booking System.

# Provider configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Input variables
variable "cluster_name" {
  description = "Name of the ElastiCache cluster"
  type        = string
}

variable "node_type" {
  description = "The compute and memory capacity of the nodes"
  type        = string
}

variable "num_cache_nodes" {
  description = "The number of cache nodes in the cluster"
  type        = number
}

variable "subnet_ids" {
  description = "List of subnet IDs for the ElastiCache subnet group"
  type        = list(string)
}

variable "vpc_id" {
  description = "ID of the VPC where the ElastiCache cluster will be deployed"
  type        = string
}

variable "allowed_cidr_blocks" {
  description = "List of CIDR blocks allowed to access the ElastiCache cluster"
  type        = list(string)
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

# ElastiCache cluster resource
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = var.cluster_name
  engine               = "redis"
  node_type            = var.node_type
  num_cache_nodes      = var.num_cache_nodes
  parameter_group_name = "default.redis6.x"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.default.name
  security_group_ids   = [aws_security_group.redis.id]

  tags = {
    Name        = var.cluster_name
    Environment = var.environment
    Project     = "Ice Rink Management System"
  }
}

# ElastiCache subnet group
resource "aws_elasticache_subnet_group" "default" {
  name       = "${var.cluster_name}-subnet-group"
  subnet_ids = var.subnet_ids
}

# Security group for ElastiCache
resource "aws_security_group" "redis" {
  name        = "${var.cluster_name}-redis-sg"
  description = "Security group for ElastiCache Redis cluster"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.cluster_name}-redis-sg"
    Environment = var.environment
    Project     = "Ice Rink Management System"
  }
}

# Output values
output "redis_endpoint" {
  description = "The endpoint of the Redis cluster"
  value       = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "redis_port" {
  description = "The port of the Redis cluster"
  value       = aws_elasticache_cluster.redis.port
}

# Human tasks (commented)
# TODO: Review and adjust the ElastiCache cluster configuration (node type, number of nodes) based on expected load and performance requirements
# TODO: Ensure that the VPC, subnet IDs, and CIDR blocks are correctly configured in the variables file
# TODO: Consider implementing encryption at rest and in transit for the Redis cluster if handling sensitive data
# TODO: Set up CloudWatch alarms for monitoring the ElastiCache cluster's performance and health