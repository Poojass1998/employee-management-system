variable "db_username" {
  description = "Username for the RDS MySQL database"
  type        = string
}

variable "db_password" {
  description = "Password for the RDS MySQL database"
  type        = string
  sensitive   = true
}
