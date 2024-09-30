# AWS Provider configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# S3 Bucket resource
resource "aws_s3_bucket" "main" {
  bucket = var.bucket_name
  acl    = "private"

  force_destroy = true

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle_rule {
    enabled = true

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
  }

  tags = {
    Name        = var.bucket_name
    Environment = var.environment
    Project     = "Ice Rink Management and Booking System"
  }
}

# S3 Bucket Public Access Block
resource "aws_s3_bucket_public_access_block" "main" {
  bucket = aws_s3_bucket.main.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Variables
variable "bucket_name" {
  type        = string
  description = "The name of the S3 bucket"
}

variable "environment" {
  type        = string
  description = "The deployment environment (e.g., dev, staging, prod)"
}

# Outputs
output "bucket_id" {
  value       = aws_s3_bucket.main.id
  description = "The ID of the created S3 bucket"
}

output "bucket_arn" {
  value       = aws_s3_bucket.main.arn
  description = "The ARN of the created S3 bucket"
}

# TODO: Implement appropriate IAM policies for accessing the S3 bucket
# TODO: Consider implementing additional security measures such as bucket policies or CORS configuration if needed
# TODO: Review and adjust the S3 bucket configuration based on specific project requirements