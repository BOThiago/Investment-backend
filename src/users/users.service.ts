import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto/users.dto';
import { prisma } from 'prisma/client';

@Injectable()
export class UsersService {
  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return await prisma.user.create({
      data: createUserDTO
    })
  }    

  async findUserById(userId: number): Promise<UserDTO> {
    return await prisma.user.findFirst({
      where: {
        id: userId
      }
    })
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<UserDTO> {
    return await prisma.user.update({
      where: {
        id: updateUserDTO.id
      },
      data: updateUserDTO
    })
  }

  async deleteUser(userId: number): Promise<UserDTO> {
    return await prisma.user.delete({
      where: {
        id: userId
      }
    })
  }
}
