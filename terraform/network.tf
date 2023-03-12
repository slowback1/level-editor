resource "aws_vpc" "level_editor_vpc" {
    cidr_block = "10.0.0.0/16"

    tags = {
        Name = "${local.project_name} VPC"
    }
}

resource "aws_subnet" "level_editor_subnet" {
    vpc_id                  = "${aws_vpc.level_editor_vpc.id}"
    cidr_block              = "10.0.0.0/20"
}

resource "aws_internet_gateway" "level_editor_igw" {
    vpc_id = aws_vpc.level_editor_vpc.id

    tags = {
        Name = "${local.project_name} Gateway"
    }
}

resource "aws_route_table" "level_editor_route_table" {
    vpc_id = aws_vpc.level_editor_vpc.id
}

resource "aws_route_table_association" "level_editor_route_table_association" {
    route_table_id = aws_route_table.level_editor_route_table.id
    subnet_id      = aws_subnet.level_editor_subnet.id
}

resource "aws_route" "level_editor_route_igw" {
    route_table_id         = aws_route_table.level_editor_route_table.id
    destination_cidr_block = "0.0.0.0/0"
    gateway_id             = aws_internet_gateway.level_editor_igw.id
}

resource "aws_security_group" "level_editor_security_group" {
    vpc_id = aws_vpc.level_editor_vpc.id

    egress {
        from_port        = 0
        protocol         = "-1"
        to_port          = 0
        cidr_blocks      = ["0.0.0.0/0"]
        ipv6_cidr_blocks = ["::/0"]
    }

    tags = {
        Name = "${local.project_name} SG"
    }
}

resource "aws_security_group_rule" "https_from_world" {
    from_port         = 0
    cidr_blocks       = ["0.0.0.0/0"]
    ipv6_cidr_blocks  = ["::/0"]
    protocol          = "tcp"
    security_group_id = aws_security_group.level_editor_security_group.id
    to_port           = 443
    type              = "ingress"
}

resource "aws_security_group_rule" "http_from_world" {
    from_port         = 0
    cidr_blocks       = ["0.0.0.0/0"]
    ipv6_cidr_blocks  = ["::/0"]
    protocol          = "tcp"
    security_group_id = aws_security_group.level_editor_security_group.id
    to_port           = 80
    type              = "ingress"
}