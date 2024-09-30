variable "function_name" {
  type        = string
  description = "The name of the Lambda function"
}

variable "filename" {
  type        = string
  description = "The path to the Lambda deployment package"
}

variable "handler" {
  type        = string
  description = "The function entrypoint in your code"
}

variable "runtime" {
  type        = string
  description = "The runtime environment for the Lambda function"
  default     = "nodejs14.x"
}

variable "role_name" {
  type        = string
  description = "The name of the IAM role for the Lambda function"
}

variable "log_retention_in_days" {
  type        = number
  description = "The number of days to retain Lambda function logs"
  default     = 14
}

variable "environment_variables" {
  type        = map(string)
  description = "A map of environment variables to pass to the Lambda function"
  default     = {}
}

variable "timeout" {
  type        = number
  description = "The amount of time your Lambda function has to run in seconds"
  default     = 3
}

variable "memory_size" {
  type        = number
  description = "Amount of memory in MB your Lambda function can use at runtime"
  default     = 128
}

# TODO: Review and adjust default values for variables based on specific requirements of the Ice Rink Management and Booking System

# TODO: Determine if additional variables are needed for specific Lambda functions in the system