variable "ami_id" {
  type        = string
  description = "The AMI ID to use for the EC2 instance"
}

variable "instance_type" {
  type        = string
  description = "The instance type for the EC2 instance"
  default     = "t3.micro"
}

variable "key_name" {
  type        = string
  description = "The name of the key pair to use for SSH access"
}

variable "security_group_ids" {
  type        = list(string)
  description = "List of security group IDs to associate with the EC2 instance"
}

variable "subnet_id" {
  type        = string
  description = "The subnet ID where the EC2 instance will be launched"
}

variable "associate_public_ip" {
  type        = bool
  description = "Whether to associate a public IP address with the EC2 instance"
  default     = false
}

variable "instance_name" {
  type        = string
  description = "Name tag for the EC2 instance"
}

variable "environment" {
  type        = string
  description = "Environment tag for the EC2 instance (e.g., 'dev', 'staging', 'prod')"
}

# Additional variables for more granular control (optional)

variable "root_volume_size" {
  type        = number
  description = "Size of the root volume in gigabytes"
  default     = 20
}

variable "root_volume_type" {
  type        = string
  description = "Type of the root volume (e.g., 'gp2', 'gp3', 'io1')"
  default     = "gp3"
}

variable "iam_instance_profile" {
  type        = string
  description = "The IAM instance profile to associate with the EC2 instance"
  default     = null
}

variable "user_data" {
  type        = string
  description = "The user data to provide when launching the instance"
  default     = null
}

variable "tags" {
  type        = map(string)
  description = "Additional tags to apply to the EC2 instance"
  default     = {}
}

# Monitoring and performance variables

variable "monitoring" {
  type        = bool
  description = "If true, the launched EC2 instance will have detailed monitoring enabled"
  default     = false
}

variable "ebs_optimized" {
  type        = bool
  description = "If true, the launched EC2 instance will be EBS-optimized"
  default     = null
}

# Networking variables

variable "private_ip" {
  type        = string
  description = "Private IP address to associate with the instance in a VPC"
  default     = null
}

variable "secondary_private_ips" {
  type        = list(string)
  description = "A list of secondary private IPv4 addresses to assign to the instance's primary network interface"
  default     = null
}

# Placement group variable

variable "placement_group" {
  type        = string
  description = "The Placement Group to start the instance in"
  default     = null
}

# Tenancy variable

variable "tenancy" {
  type        = string
  description = "The tenancy of the instance (if the instance is running in a VPC). Available values: default, dedicated, host"
  default     = "default"
}
```

This `variables.tf` file defines all the necessary input variables for the EC2 module, including the required variables specified in the JSON representation and additional optional variables for more granular control over the EC2 instance configuration. The file is structured to provide flexibility and customization options for different deployment scenarios.

Human tasks (commented within the file):

```
# Human tasks:
# TODO: Review and adjust default values for variables based on specific deployment requirements
# TODO: Consider adding additional variables for more granular control over EC2 instance configuration
# TODO: Ensure variable names and descriptions are clear and aligned with company naming conventions