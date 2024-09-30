# Output definitions for the VPC module

output "vpc_id" {
  value       = aws_vpc.main.id
  description = "The ID of the VPC"
}

output "subnet_ids" {
  value       = aws_subnet.main[*].id
  description = "List of IDs of the created subnets"
}

output "internet_gateway_id" {
  value       = aws_internet_gateway.main.id
  description = "The ID of the Internet Gateway"
}

output "vpc_cidr_block" {
  value       = aws_vpc.main.cidr_block
  description = "The CIDR block of the VPC"
}

output "subnet_cidr_blocks" {
  value       = aws_subnet.main[*].cidr_block
  description = "List of CIDR blocks of the created subnets"
}

output "route_table_id" {
  value       = aws_route_table.main.id
  description = "The ID of the main route table"
}

# Human tasks:
# TODO: Verify that all necessary VPC information is being output for use in other modules or the root configuration
# TODO: Ensure that sensitive information is not being exposed through outputs