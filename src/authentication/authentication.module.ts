import { AuthenticationService } from 'src/authentication/authentication.service';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ConfigService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
