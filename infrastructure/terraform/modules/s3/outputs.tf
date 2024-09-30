# Output the ID of the created S3 bucket
output "bucket_id" {
  description = "The ID of the created S3 bucket"
  value       = aws_s3_bucket.main.id
}

# Output the ARN (Amazon Resource Name) of the created S3 bucket
output "bucket_arn" {
  description = "The ARN of the created S3 bucket"
  value       = aws_s3_bucket.main.arn
}

# Output the region where the S3 bucket is created
output "bucket_region" {
  description = "The region where the S3 bucket is created"
  value       = aws_s3_bucket.main.region
}

# Commented list of human tasks:
# TODO: Review the outputs and ensure they provide all necessary information for other modules or the root module
# TODO (Optional): Consider adding additional outputs if more S3 bucket properties are needed in other parts of the infrastructure