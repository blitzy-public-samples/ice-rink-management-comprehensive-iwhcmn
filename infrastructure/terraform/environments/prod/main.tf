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
    bucket         = "ice-rink-terraform-state-prod"
    key            = "prod/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-lock-prod"
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

# VPC Module
module "vpc" {
  source             = "../../modules/vpc"
  name               = "${var.project_name}-vpc-prod"
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
  source        = "../../modules/ec2"
  name          = "${var.project_name}-ec2-prod"
  instance_type = var.ec2_instance_type
  vpc_id        = module.vpc.vpc_id
  subnet_ids    = module.vpc.private_subnets
  key_name      = var.ec2_key_name
  min_size      = 2
  max_size      = 10
  desired_capacity = 2
}

# RDS Module
module "rds" {
  source                 = "../../modules/rds"
  identifier             = "${var.project_name}-db-prod"
  engine                 = "postgres"
  engine_version         = "13.7"
  instance_class         = var.rds_instance_class
  allocated_storage      = 100
  max_allocated_storage  = 1000
  multi_az               = true
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  subnet_ids             = module.vpc.private_subnets
  backup_retention_period = 30
  deletion_protection    = true
}

# ElastiCache Module
module "elasticache" {
  source               = "../../modules/elasticache"
  cluster_id           = "${var.project_name}-redis-prod"
  engine               = "redis"
  node_type            = var.elasticache_node_type
  num_cache_nodes      = 3
  parameter_group_name = "default.redis6.x.cluster.on"
  engine_version       = "6.x"
  subnet_group_name    = module.vpc.elasticache_subnet_group_name
  security_group_ids   = [module.vpc.default_security_group_id]
}

# S3 Module
module "s3" {
  source      = "../../modules/s3"
  bucket_name = "${var.project_name}-assets-prod"
  acl         = "private"
  versioning = {
    enabled = true
  }
  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }
}

# CloudFront Module
module "cloudfront" {
  source                   = "../../modules/cloudfront"
  origin_domain_name       = module.s3.bucket_regional_domain_name
  origin_id                = "${var.project_name}-origin-prod"
  price_class              = "PriceClass_All"
  minimum_protocol_version = "TLSv1.2_2021"
  ssl_support_method       = "sni-only"
}

# Lambda Module
module "lambda" {
  source          = "../../modules/lambda"
  function_name   = "${var.project_name}-function-prod"
  handler         = "index.handler"
  runtime         = "nodejs14.x"
  source_code_hash = filebase64sha256(var.lambda_payload_file)
  vpc_config = {
    subnet_ids         = module.vpc.private_subnets
    security_group_ids = [module.vpc.default_security_group_id]
  }
  environment = {
    variables = {
      NODE_ENV = "production"
    }
  }
  reserved_concurrent_executions = 100
}

# TODO: Implement proper IAM roles and policies for production EC2, RDS, and Lambda resources
# TODO: Set up CloudWatch alarms and logs for monitoring the production infrastructure
# TODO: Configure backup and disaster recovery strategies for production RDS and other critical components
# TODO: Implement and test auto-scaling policies for EC2 instances
# TODO: Set up production-grade security measures (e.g., WAF, GuardDuty)
# TODO: Configure SSL/TLS certificates for production domains
# TODO: Implement proper logging and auditing for all production resources
# TODO: Review and implement necessary compliance measures (e.g., GDPR, PCI DSS)