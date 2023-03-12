resource "aws_s3_bucket" "tf-state" {
  bucket = "level-editor-terraform-state"
}
resource "aws_s3_bucket" "registry" {
    bucket = "level-editor-terraform-registry"
}
resource "aws_s3_bucket" "database" {
    bucket = "level-editor-terraform-database"
}
resource "aws_s3_bucket" "images" {
    bucket = "level-editor-terraform-images"
}