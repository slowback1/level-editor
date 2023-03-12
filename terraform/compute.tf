resource "aws_instance" "compute_instance" {
  ami = "ami-0c55b159cbfafe1f0"
  instance_type = "t4g.micro"
  associate_public_ip_address = true

}