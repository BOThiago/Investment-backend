import { StocksModule } from './modules/stocks/stocks.module';
import { StocksController } from './modules/stocks/stocks.controller';
import { Module } from '@nestjs/common';
import { FiisModule } from './modules/fiis/fiis.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { CryptoService } from './modules/crypto/crypto.service';
import { CryptoController } from './modules/crypto/crypto.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { FiisService } from './modules/fiis/fiis.service';
import { FiisController } from './modules/fiis/fiis.controller';
import { StocksService } from './modules/stocks/stocks.service';

@Module({
  imports: [StocksModule, FiisModule, CryptoModule],
  controllers: [
    StocksController,
    FiisController,
    CryptoController,
    AppController,
  ],
  providers: [
    AppService,
    PrismaService,
    FiisService,
    StocksService,
    CryptoService,
  ],
})
export class AppModule {}
