# Terraform outputs definition file for the Ice Rink Management and Booking System infrastructure

# VPC Outputs
output "vpc_id" {
  value       = module.vpc.vpc_id
  description = "ID of the created VPC"
}

output "private_subnet_ids" {
  value       = module.vpc.private_subnets
  description = "List of private subnet IDs"
}

output "public_subnet_ids" {
  value       = module.vpc.public_subnets
  description = "List of public subnet IDs"
}

# EC2 Outputs
output "ec2_instance_ids" {
  value       = module.ec2.instance_ids
  description = "List of EC2 instance IDs"
}

output "ec2_private_ips" {
  value       = module.ec2.private_ips
  description = "List of private IP addresses of EC2 instances"
}

# RDS Outputs
output "rds_endpoint" {
  value       = module.rds.endpoint
  description = "Endpoint of the RDS instance"
}

output "rds_database_name" {
  value       = module.rds.database_name
  description = "Name of the created database"
}

# ElastiCache Outputs
output "elasticache_endpoint" {
  value       = module.elasticache.cache_nodes.0.address
  description = "Endpoint of the ElastiCache Redis cluster"
}

# S3 Outputs
output "s3_bucket_name" {
  value       = module.s3.bucket_name
  description = "Name of the created S3 bucket"
}

# CloudFront Outputs
output "cloudfront_distribution_id" {
  value       = module.cloudfront.distribution_id
  description = "ID of the CloudFront distribution"
}

output "cloudfront_domain_name" {
  value       = module.cloudfront.domain_name
  description = "Domain name of the CloudFront distribution"
}

# Lambda Outputs
output "lambda_function_name" {
  value       = module.lambda.function_name
  description = "Name of the created Lambda function"
}

output "lambda_function_arn" {
  value       = module.lambda.function_arn
  description = "ARN of the created Lambda function"
}

# TODO: Review the outputs to ensure all necessary information is included for other team members or external systems
# TODO: Consider adding sensitive outputs (like database passwords) if needed, but ensure they are marked as sensitive
# TODO: Verify that the output values correctly reference the module outputs
# TODO: Add any additional custom outputs that might be useful for your specific project requirements