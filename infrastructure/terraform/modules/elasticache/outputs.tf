# Outputs for the ElastiCache Redis module in the Ice Rink Management and Booking System

output "redis_endpoint" {
  description = "The endpoint of the Redis cluster"
  value       = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "redis_port" {
  description = "The port of the Redis cluster"
  value       = aws_elasticache_cluster.redis.port
}

output "redis_config_endpoint" {
  description = "The configuration endpoint of the Redis cluster"
  value       = aws_elasticache_cluster.redis.configuration_endpoint
}

output "redis_cluster_id" {
  description = "The ID of the ElastiCache Redis cluster"
  value       = aws_elasticache_cluster.redis.id
}

output "redis_subnet_group_name" {
  description = "The name of the ElastiCache subnet group"
  value       = aws_elasticache_subnet_group.default.name
}

output "redis_security_group_id" {
  description = "The ID of the security group created for the Redis cluster"
  value       = aws_security_group.redis.id
}

# Human tasks:
# TODO: Review the outputs to ensure they provide all necessary information for other modules or the root module to use
# TODO: Consider adding additional outputs if more information about the ElastiCache cluster is needed by other parts of the infrastructure