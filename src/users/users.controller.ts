import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import { AuthenticationGuard } from 'src/authentication/guards/authentication.guard';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserData: CreateUserDTO) {
    return await this.usersService.createUser(createUserData);
  }

  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return await this.usersService.findUserById(Number(id));
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserData: UpdateUserDTO,
  ) {
    return await this.usersService.updateUser(Number(id), updateUserData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(Number(id));
  }
}
