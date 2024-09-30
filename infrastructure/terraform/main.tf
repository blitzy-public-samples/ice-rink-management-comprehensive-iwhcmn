# Specify the required Terraform version and providers
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

  # Configure the backend for storing Terraform state
  backend "s3" {
    bucket         = "ice-rink-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

# Configure the AWS provider
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

# VPC Module
module "vpc" {
  source = "./modules/vpc"

  name               = "${var.project_name}-vpc"
  cidr               = var.vpc_cidr
  azs                = var.availability_zones
  private_subnets    = var.private_subnet_cidrs
  public_subnets     = var.public_subnet_cidrs
  enable_nat_gateway = true
  single_nat_gateway = false
  enable_vpn_gateway = false
}

# EC2 Module
module "ec2" {
  source = "./modules/ec2"

  name          = "${var.project_name}-ec2"
  instance_type = var.ec2_instance_type
  vpc_id        = module.vpc.vpc_id
  subnet_ids    = module.vpc.private_subnets
  key_name      = var.ec2_key_name
}

# RDS Module
module "rds" {
  source = "./modules/rds"

  identifier               = "${var.project_name}-db"
  engine                   = "postgres"
  engine_version           = "13.7"
  instance_class           = var.rds_instance_class
  allocated_storage        = 20
  vpc_security_group_ids   = [module.vpc.default_security_group_id]
  subnet_ids               = module.vpc.private_subnets
}

# ElastiCache Module
module "elasticache" {
  source = "./modules/elasticache"

  cluster_id        = "${var.project_name}-redis"
  engine            = "redis"
  node_type         = var.elasticache_node_type
  num_cache_nodes   = 1
  subnet_group_name = module.vpc.elasticache_subnet_group_name
  security_group_ids = [module.vpc.default_security_group_id]
}

# S3 Module
module "s3" {
  source = "./modules/s3"

  bucket_name = "${var.project_name}-assets"
  acl         = "private"
}

# CloudFront Module
module "cloudfront" {
  source = "./modules/cloudfront"

  origin_domain_name = module.s3.bucket_regional_domain_name
  origin_id          = "${var.project_name}-origin"
}

# Lambda Module
module "lambda" {
  source = "./modules/lambda"

  function_name     = "${var.project_name}-function"
  handler           = "index.handler"
  runtime           = "nodejs14.x"
  source_code_hash  = filebase64sha256(var.lambda_payload_file)
  vpc_config = {
    subnet_ids         = module.vpc.private_subnets
    security_group_ids = [module.vpc.default_security_group_id]
  }
}

# TODO: Implement proper IAM roles and policies for EC2, RDS, and Lambda resources
# TODO: Set up CloudWatch alarms and logs for monitoring the infrastructure
# TODO: Configure backup and disaster recovery strategies for RDS and other critical components