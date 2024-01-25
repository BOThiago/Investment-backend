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
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/google.strategy';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StocksModule, FiisModule, CryptoModule, AuthModule],
  controllers: [
    StocksController,
    FiisController,
    CryptoController,
    AppController,
    AuthController,
  ],
  providers: [
    AppService,
    PrismaService,
    FiisService,
    StocksService,
    CryptoService,
    AuthService,
    GoogleStrategy,
  ],
})
export class AppModule {}
