import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UserDTO {
  @IsNumber()
  id: number 

  @IsString()
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  password?: string
}
