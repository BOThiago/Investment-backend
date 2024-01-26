import { IsEmpty, IsOptional, IsString } from "class-validator"

export class UserDTO {
  id: string
  name: string
  email: string
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
