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
@Module({
  imports: [StocksModule, FiisModule, CryptoModule],
  controllers: [
    StocksController,
    FiisController,
    CryptoController,
    AppController,
    UsersController,
  ],
  providers: [
    AppService,
    PrismaService,
    FiisService,
    StocksService,
    CryptoService,
    UsersService
  ],
})
export class AppModule {}
