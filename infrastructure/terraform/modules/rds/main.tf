# Provider configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# RDS instance resource
resource "aws_db_instance" "ice_rink_db" {
  identifier        = var.rds_identifier
  engine            = "postgres"
  engine_version    = var.postgres_version
  instance_class    = var.db_instance_class
  allocated_storage = var.allocated_storage
  storage_type      = "gp2"
  storage_encrypted = true
  kms_key_id        = var.kms_key_arn

  db_name  = var.database_name
  username = var.database_username
  password = var.database_password
  port     = 5432

  vpc_security_group_ids = var.vpc_security_group_ids

  maintenance_window      = var.maintenance_window
  backup_window           = var.backup_window
  backup_retention_period = var.backup_retention_period

  multi_az               = var.multi_az
  skip_final_snapshot    = false
  final_snapshot_identifier = "${var.rds_identifier}-final-snapshot"

  publicly_accessible    = false
  allow_major_version_upgrade = false
  auto_minor_version_upgrade  = true
  apply_immediately      = var.apply_immediately
  deletion_protection    = true

  tags = {
    Name        = "ice-rink-management-db"
    Environment = var.environment
    Project     = "Ice Rink Management and Booking System"
  }
}
```

This Terraform configuration file creates an RDS instance for the Ice Rink Management and Booking System. Here's a breakdown of the configuration:

1. We specify the required provider (AWS) and its version.
2. We define an `aws_db_instance` resource named `ice_rink_db`.
3. The configuration uses variables for most of the settings, allowing for flexibility and reusability across different environments.
4. Security features are enabled, such as storage encryption and deletion protection.
5. Backup and maintenance windows are configurable through variables.
6. Multi-AZ deployment is optional and controlled by a variable.
7. The instance is not publicly accessible for security reasons.
8. Tags are added for better resource management and identification.

Note that this configuration assumes that the necessary variables are defined in a `variables.tf` file, which should be created separately. Also, an `outputs.tf` file should be created to export important values from this module.

Human Tasks (commented in the file):
```
# TODO: Define and create the variables.tf file with all necessary variables used in this module
# TODO: Define and create the outputs.tf file to export necessary values from this module
# TODO: Review and adjust the RDS configuration parameters to ensure they meet the specific requirements of the Ice Rink Management and Booking System
# TODO: Ensure that the KMS key for RDS encryption is properly set up and its ARN is provided
# TODO: Configure appropriate VPC security groups for the RDS instance
# TODO: Determine the appropriate values for maintenance_window, backup_window, and backup_retention_period
# TODO: Decide on whether multi-AZ deployment is necessary for the production environment