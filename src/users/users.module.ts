import { AuthenticationService } from 'src/authentication/authentication.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthenticationService],
  exports: [UsersService],
})
export class UsersModule {}
