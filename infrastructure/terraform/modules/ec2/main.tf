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
variable "ami_id" {
  description = "The AMI ID to use for the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "The instance type to use for the EC2 instance"
  type        = string
}

variable "key_name" {
  description = "The key pair name to use for the EC2 instance"
  type        = string
}

variable "security_group_ids" {
  description = "A list of security group IDs to associate with the EC2 instance"
  type        = list(string)
}

variable "subnet_id" {
  description = "The subnet ID to launch the EC2 instance in"
  type        = string
}

variable "associate_public_ip" {
  description = "Whether to associate a public IP address with the EC2 instance"
  type        = bool
  default     = true
}

variable "instance_name" {
  description = "The name to give the EC2 instance"
  type        = string
}

variable "environment" {
  description = "The environment (e.g., dev, staging, prod) this instance is for"
  type        = string
}

# EC2 Instance Resource
resource "aws_instance" "this" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  key_name                    = var.key_name
  vpc_security_group_ids      = var.security_group_ids
  subnet_id                   = var.subnet_id
  associate_public_ip_address = var.associate_public_ip

  tags = {
    Name        = var.instance_name
    Environment = var.environment
    Project     = "Ice Rink Management System"
  }

  # Root volume
  root_block_device {
    volume_type = "gp2"
    volume_size = 30
    encrypted   = true
  }

  # Enable detailed monitoring
  monitoring = true

  # User data script for initial setup
  user_data = <<-EOF
              #!/bin/bash
              # Update and install necessary packages
              yum update -y
              yum install -y amazon-cloudwatch-agent

              # Start CloudWatch agent
              /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c ssm:AmazonCloudWatch-linux

              # Additional setup steps can be added here
              EOF

  # IAM instance profile (ensure this is created separately)
  # iam_instance_profile = "EC2InstanceProfile"

  lifecycle {
    create_before_destroy = true
  }
}

# Outputs
output "instance_id" {
  description = "ID of the created EC2 instance"
  value       = aws_instance.this.id
}

output "public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.this.public_ip
}

output "private_ip" {
  description = "Private IP address of the EC2 instance"
  value       = aws_instance.this.private_ip
}

# TODO: Implement additional security measures such as disk encryption and detailed monitoring
# TODO: Ensure proper IAM roles and policies are attached to the EC2 instance
# TODO: Review and adjust EC2 instance specifications based on application requirements