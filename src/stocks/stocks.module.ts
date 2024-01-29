import { ImagesService } from 'src/images/images.service';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { Module } from '@nestjs/common'; 
@Module({
  controllers: [StocksController],
  providers: [StocksService, ImagesService],
  exports: [StocksService],
})
export class StocksModule {}
