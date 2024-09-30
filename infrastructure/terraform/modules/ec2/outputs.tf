# Output definitions for the EC2 module in the Ice Rink Management and Booking System

output "instance_id" {
  description = "The ID of the created EC2 instance"
  value       = aws_instance.this.id
}

output "public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.this.public_ip
}

output "private_ip" {
  description = "The private IP address of the EC2 instance"
  value       = aws_instance.this.private_ip
}

output "instance_state" {
  description = "The current state of the EC2 instance"
  value       = aws_instance.this.instance_state
}

output "availability_zone" {
  description = "The availability zone where the EC2 instance is launched"
  value       = aws_instance.this.availability_zone
}

# Human tasks:
# TODO: Review and confirm that all necessary EC2 instance attributes are being output
# TODO: Consider adding additional outputs that might be useful for other modules or for operational purposes