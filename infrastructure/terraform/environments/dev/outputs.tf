output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.main.vpc_id
}

output "public_subnet_ids" {
  description = "List of IDs of public subnets"
  value       = module.main.public_subnet_ids
}

output "private_subnet_ids" {
  description = "List of IDs of private subnets"
  value       = module.main.private_subnet_ids
}

output "ec2_instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = module.main.ec2_instance_public_ip
}

output "rds_endpoint" {
  description = "The connection endpoint for the RDS instance"
  value       = module.main.rds_endpoint
}

output "elasticache_cluster_address" {
  description = "The DNS name of the ElastiCache cluster without the port appended"
  value       = module.main.elasticache_cluster_address
}

output "s3_bucket_name" {
  description = "The name of the S3 bucket created for file storage"
  value       = module.main.s3_bucket_name
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = module.main.cloudfront_distribution_id
}

output "lambda_function_name" {
  description = "The name of the Lambda function"
  value       = module.main.lambda_function_name
}

output "api_gateway_url" {
  description = "The URL of the API Gateway"
  value       = module.main.api_gateway_url
}

# Human tasks (commented):
# TODO: Review the outputs to ensure they provide all necessary information for the development environment
# TODO: Consider adding additional outputs specific to the development environment, such as debug endpoints or test user credentials
# TODO: Ensure that sensitive information is not exposed through outputs
# TODO: Verify that all output values correctly reference the main module outputs
# TODO: Document how to use these output values in other parts of the development workflow or CI/CD pipeline