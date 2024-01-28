import { StocksModule } from './stocks/stocks.module';
import { Module } from '@nestjs/common';
import { FiisModule } from './fiis/fiis.module';
import { CryptoModule } from './crypto/crypto.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    StocksModule, 
    FiisModule, 
    CryptoModule, 
    UsersModule, 
  ],
})
export class AppModule {}
