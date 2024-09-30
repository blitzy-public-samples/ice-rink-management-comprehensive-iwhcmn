variable "s3_bucket_regional_domain_name" {
  type        = string
  description = "The regional domain name of the S3 bucket that will serve as the origin for the CloudFront distribution"
}

variable "s3_bucket_name" {
  type        = string
  description = "The name of the S3 bucket that will serve as the origin for the CloudFront distribution"
}

variable "price_class" {
  type        = string
  description = "The price class for the CloudFront distribution (e.g., PriceClass_100, PriceClass_200, PriceClass_All)"
  default     = "PriceClass_100"
}

variable "default_root_object" {
  type        = string
  description = "The object that you want CloudFront to return when an end user requests the root URL"
  default     = "index.html"
}

variable "enabled" {
  type        = bool
  description = "Whether the distribution is enabled to accept end user requests for content"
  default     = true
}

variable "is_ipv6_enabled" {
  type        = bool
  description = "Whether the IPv6 is enabled for the distribution"
  default     = true
}

variable "custom_error_response" {
  type = object({
    error_code         = number
    response_code      = number
    response_page_path = string
  })
  description = "Custom error response to return to the viewer when your origin returns specific HTTP status codes"
  default = {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
}

# TODO: Review and adjust default values for variables based on specific project requirements
# TODO: Consider adding variables for custom domain and SSL certificate configuration
# TODO: Evaluate the need for additional variables to support more complex CloudFront configurations