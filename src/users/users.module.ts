import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Module({
  imports: [AuthenticationModule],
  providers: [UsersService, AuthenticationService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
