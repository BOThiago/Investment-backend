import { AuthenticationService } from 'src/authentication/authentication.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AuthenticationService, ConfigService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
