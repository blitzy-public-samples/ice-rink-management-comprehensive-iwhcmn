variable "vpc_cidr" {
  type        = string
  description = "The CIDR block for the VPC."
  default     = "10.0.0.0/16"
}

variable "subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for subnets within the VPC."
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "availability_zones" {
  type        = list(string)
  description = "List of availability zones in which to create subnets."
  default     = ["us-west-2a", "us-west-2b", "us-west-2c"]
}

variable "enable_dns_hostnames" {
  type        = bool
  description = "A boolean flag to enable/disable DNS hostnames in the VPC."
  default     = true
}

variable "enable_dns_support" {
  type        = bool
  description = "A boolean flag to enable/disable DNS support in the VPC."
  default     = true
}

variable "tags" {
  type        = map(string)
  description = "A map of tags to add to all resources."
  default = {
    Terraform   = "true"
    Environment = "dev"
  }
}

# TODO: Review and adjust default CIDR blocks for VPC and subnets based on network architecture requirements.
# TODO: Confirm the list of availability zones matches the target AWS region for deployment.
# TODO: Verify that the default tags are appropriate for the organization's tagging strategy.