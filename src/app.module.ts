import { StocksModule } from './stocks/stocks.module';
import { StocksController } from './stocks/stocks.controller';
import { Module } from '@nestjs/common';
import { FiisModule } from './fiis/fiis.module';
import { CryptoModule } from './crypto/crypto.module';
import { CryptoService } from './crypto/crypto.service';
import { CryptoController } from './crypto/crypto.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { FiisService } from './fiis/fiis.service';
import { FiisController } from './fiis/fiis.controller';
import { StocksService } from './stocks/stocks.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  imports: [ConfigModule.forRoot(), StocksModule, FiisModule, CryptoModule],
  controllers: [
    StocksController,
    FiisController,
    CryptoController,
    AppController,
    UsersController,
    AuthenticationController
  ],
  providers: [
    AppService,
    PrismaService,
    FiisService,
    StocksService,
    CryptoService,
    UsersService,
    AuthenticationService,
  ],
})
export class AppModule {}
