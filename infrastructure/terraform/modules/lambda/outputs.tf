# Output configuration for the Lambda module

output "lambda_function_arn" {
  description = "The ARN (Amazon Resource Name) of the Lambda function"
  value       = aws_lambda_function.main.arn
}

output "lambda_function_name" {
  description = "The name of the Lambda function"
  value       = aws_lambda_function.main.function_name
}

output "lambda_function_invoke_arn" {
  description = "The ARN to be used for invoking the Lambda function from API Gateway"
  value       = aws_lambda_function.main.invoke_arn
}

output "lambda_role_arn" {
  description = "The ARN of the IAM role associated with the Lambda function"
  value       = aws_iam_role.lambda_role.arn
}

output "cloudwatch_log_group_name" {
  description = "The name of the CloudWatch Log Group associated with the Lambda function"
  value       = aws_cloudwatch_log_group.lambda_log_group.name
}

# Human tasks (commented):
# TODO: Review and confirm if additional outputs are needed for specific Lambda functions in the Ice Rink Management and Booking System
# TODO: Ensure that the outputs align with the requirements of other modules or the root module that may use these values