import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return null
  }    

  async findUserById(userId: number): Promise<UserDTO> {
    return null
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
    return null
  }

  async deleteUser(userId: number): Promise<UserDTO> {
    return null
  }
}
