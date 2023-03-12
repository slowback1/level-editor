locals {
  project_name = "Level Editor"
}

terraform {
  backend "s3" {
    bucket = "level-editor-terraform-state"
    key    = "terraform.tfstate"
    region = "us-east-2"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">=1.2.0"
}

provider "aws" {
  region = "us-east-2"

  default_tags {
    tags = {
      Project = local.project_name
      Contact = "Drew Wobeck"
    }
  }
}

