output "rds_endpoint" {
  value = aws_db_instance.employee_db.endpoint
}

output "s3_bucket_name" {
  value = aws_s3_bucket.employee_photos.bucket
}
