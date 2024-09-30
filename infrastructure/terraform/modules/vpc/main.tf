# Provider configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Variables
variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
}

variable "subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for subnets"
}

variable "availability_zones" {
  type        = list(string)
  description = "List of availability zones to use for subnets"
}

# Main VPC resource
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "ice-rink-management-vpc"
    Environment = terraform.workspace
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "ice-rink-management-igw"
    Environment = terraform.workspace
  }
}

# Subnets
resource "aws_subnet" "main" {
  count                   = length(var.subnet_cidrs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "ice-rink-management-subnet-${count.index + 1}"
    Environment = terraform.workspace
  }
}

# Route table
resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "ice-rink-management-route-table"
    Environment = terraform.workspace
  }
}

# Route table association
resource "aws_route_table_association" "main" {
  count          = length(aws_subnet.main)
  subnet_id      = aws_subnet.main[count.index].id
  route_table_id = aws_route_table.main.id
}

# Outputs
output "vpc_id" {
  value       = aws_vpc.main.id
  description = "ID of the created VPC"
}

output "subnet_ids" {
  value       = aws_subnet.main[*].id
  description = "List of subnet IDs"
}

output "internet_gateway_id" {
  value       = aws_internet_gateway.main.id
  description = "ID of the Internet Gateway"
}

# Human tasks (commented)
# TODO: Review and adjust VPC CIDR block and subnet CIDR blocks based on network requirements
# TODO: Confirm the number of subnets and availability zones needed for the application
# TODO: Verify that the VPC configuration complies with security best practices and organizational policies