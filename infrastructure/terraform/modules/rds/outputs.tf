# Output definitions for the RDS module in the Ice Rink Management and Booking System

output "db_instance_id" {
  description = "The RDS instance ID"
  value       = aws_db_instance.this.id
}

output "db_instance_address" {
  description = "The address of the RDS instance"
  value       = aws_db_instance.this.address
}

output "db_instance_arn" {
  description = "The ARN of the RDS instance"
  value       = aws_db_instance.this.arn
}

output "db_instance_endpoint" {
  description = "The connection endpoint in address:port format"
  value       = aws_db_instance.this.endpoint
}

output "db_instance_status" {
  description = "The RDS instance status"
  value       = aws_db_instance.this.status
}

output "db_instance_name" {
  description = "The database name"
  value       = aws_db_instance.this.name
}

output "db_instance_username" {
  description = "The master username for the database"
  value       = aws_db_instance.this.username
  sensitive   = true
}

output "db_instance_port" {
  description = "The database port"
  value       = aws_db_instance.this.port
}

# Additional helpful outputs

output "db_instance_engine" {
  description = "The database engine"
  value       = aws_db_instance.this.engine
}

output "db_instance_engine_version" {
  description = "The running version of the database engine"
  value       = aws_db_instance.this.engine_version_actual
}

output "db_instance_class" {
  description = "The RDS instance class"
  value       = aws_db_instance.this.instance_class
}

output "db_subnet_group_name" {
  description = "The database subnet group name"
  value       = aws_db_instance.this.db_subnet_group_name
}

output "db_instance_multi_az" {
  description = "If the RDS instance is multi-AZ"
  value       = aws_db_instance.this.multi_az
}

output "db_instance_backup_retention_period" {
  description = "The backup retention period"
  value       = aws_db_instance.this.backup_retention_period
}

output "db_instance_backup_window" {
  description = "The daily time range during which automated backups are created"
  value       = aws_db_instance.this.backup_window
}

output "db_instance_maintenance_window" {
  description = "The maintenance window"
  value       = aws_db_instance.this.maintenance_window
}

output "db_instance_hosted_zone_id" {
  description = "The canonical hosted zone ID of the DB instance (to be used in a Route 53 Alias record)"
  value       = aws_db_instance.this.hosted_zone_id
}