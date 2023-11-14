import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UpdateUserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  username: string
  
  @IsString()
  profilePictureURL: string
}
