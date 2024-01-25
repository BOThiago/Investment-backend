import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}
