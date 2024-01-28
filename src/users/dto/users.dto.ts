import { IsEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UserDTO {
  @IsNumber()
  id: number 

  @IsString()
  name: string

  @IsString()
  email: string

  @IsString()
  password: string
}

export class CreateUserDTO {
  @IsEmpty()
  @IsString()
  name: string

  @IsEmpty()
  @IsString()
  email: string

  @IsEmpty()
  @IsString()
  password: string
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  password?: string
}
