export class LoginUserDto {
  readonly username: string;
  readonly password: string;
}
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
export class UpdatePasswordDto {
  new_password: string;
  old_password: string;
}
