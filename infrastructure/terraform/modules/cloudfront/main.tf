# CloudFront Distribution for Ice Rink Management and Booking System

# AWS Provider configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# CloudFront distribution resource
resource "aws_cloudfront_distribution" "main" {
  # Origin configuration
  origin {
    domain_name = var.s3_bucket_regional_domain_name
    origin_id   = "S3-${var.s3_bucket_name}"
  }

  # General configuration
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  # Custom error response for SPA
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  # Default cache behavior
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.s3_bucket_name}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Price class configuration
  price_class = "PriceClass_100"

  # Restrictions
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # Viewer certificate configuration
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  # Tags
  tags = {
    Name        = "Ice Rink Management CloudFront Distribution"
    Environment = var.environment
    Project     = "Ice Rink Management and Booking System"
  }
}

# Outputs
output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.main.id
}

output "cloudfront_distribution_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.main.domain_name
}

# Human tasks (commented)
# TODO: Review and adjust the CloudFront distribution settings based on specific project requirements
# TODO: Consider setting up a custom domain and SSL certificate for the CloudFront distribution
# TODO: Evaluate the need for additional cache behaviors or origin configurations