import { AuthenticationService } from 'src/authentication/authentication.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, GoogleStrategy, ConfigService, JwtService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
