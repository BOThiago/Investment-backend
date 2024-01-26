import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.usersService.createUser(createUserDTO);
  }

  @Get(':id')
  async findUser(@Param("id") id: string) {
    return await this.usersService.findUserById(Number(id));
  }

  @Patch('')
  async updateUser(@Body() updateUserDTO: UpdateUserDTO) {
    return await this.usersService.updateUser(updateUserDTO);
  }

  @Delete(':id')
  async deleteUser(@Param("id") id: string) {
    return await this.usersService.deleteUser(Number(id));
  }
}
