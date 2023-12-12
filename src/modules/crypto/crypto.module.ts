import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CryptoController],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
