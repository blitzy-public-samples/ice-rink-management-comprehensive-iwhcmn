# Output definitions for the CloudFront module in the Ice Rink Management and Booking System

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.main.id
}

output "cloudfront_distribution_domain_name" {
  description = "The domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "cloudfront_distribution_arn" {
  description = "The ARN (Amazon Resource Name) of the CloudFront distribution"
  value       = aws_cloudfront_distribution.main.arn
}

# TODO: Review the outputs and ensure they provide all necessary information for other modules or the root module
# TODO: Consider adding additional outputs if more information about the CloudFront distribution is needed elsewhere in the infrastructure