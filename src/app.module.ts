import { StocksModule } from './stocks/stocks.module';
import { Module } from '@nestjs/common';
import { FiisModule } from './fiis/fiis.module';
import { CryptoModule } from './crypto/crypto.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    StocksModule, 
    FiisModule, 
    CryptoModule, 
    AuthenticationModule,
    UsersModule, 
  ],
})

export class AppModule {}
