# Terraform configuration for the development environment of the Ice Rink Management and Booking System

terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }

  backend "s3" {
    bucket         = "ice-rink-terraform-state-dev"
    key            = "dev/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-lock-dev"
  }
}

provider "aws" {
  region  = "us-west-2"
  profile = "ice-rink-dev"
}

module "main" {
  source = "../.."

  project_name    = "ice-rink-dev"
  aws_region      = "us-west-2"
  aws_profile     = "ice-rink-dev"
  vpc_cidr        = "10.0.0.0/16"
  availability_zones = [
    "us-west-2a",
    "us-west-2b",
    "us-west-2c"
  ]
  private_subnet_cidrs = [
    "10.0.1.0/24",
    "10.0.2.0/24",
    "10.0.3.0/24"
  ]
  public_subnet_cidrs = [
    "10.0.101.0/24",
    "10.0.102.0/24",
    "10.0.103.0/24"
  ]
  ec2_instance_type   = "t3.micro"
  ec2_key_name        = "ice-rink-dev-key"
  rds_instance_class  = "db.t3.micro"
  elasticache_node_type = "cache.t3.micro"
  lambda_payload_file = "../../lambda/function.zip"
}

variable "environment" {
  description = "The environment name"
  type        = string
  default     = "dev"
}

locals {
  common_tags = {
    Project     = "Ice Rink Management"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# TODO: Implement proper IAM roles and policies for EC2, RDS, and Lambda resources
# TODO: Set up CloudWatch alarms and logs for monitoring the development infrastructure
# TODO: Configure backup and disaster recovery strategies for RDS and other critical components
# TODO: Create the EC2 key pair 'ice-rink-dev-key' for the development environment
# TODO: Prepare the Lambda function code and create the deployment package 'function.zip'

# Human tasks:
# - Review and adjust the AWS region and profile for the development environment
# - Create and configure the S3 bucket for storing Terraform state for the development environment
# - Create a DynamoDB table for Terraform state locking for the development environment
# - Generate and securely store AWS access keys for the development environment
# - Review and adjust resource configurations (e.g., instance types, storage sizes) based on development environment requirements