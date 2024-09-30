output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "private_subnet_ids" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnets
}

output "public_subnet_ids" {
  description = "List of IDs of public subnets"
  value       = module.vpc.public_subnets
}

output "ec2_asg_name" {
  description = "Name of the EC2 Auto Scaling Group"
  value       = module.ec2.asg_name
}

output "rds_endpoint" {
  description = "Endpoint URL for the RDS instance"
  value       = module.rds.db_instance_endpoint
}

output "elasticache_cluster_address" {
  description = "DNS name of the ElastiCache cluster"
  value       = module.elasticache.cluster_address
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket for assets"
  value       = module.s3.bucket_name
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = module.cloudfront.domain_name
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = module.lambda.function_name
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = module.lambda.function_arn
}

# Human tasks:
# TODO: Review and ensure all necessary outputs are included for production use
# TODO: Consider adding sensitive outputs (if any) and mark them as sensitive
# TODO: Verify that output values align with the expected production configuration
# TODO: Document the purpose and usage of each output for team reference