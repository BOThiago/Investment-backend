import { FiisController } from './fiis.controller';
import { FiisService } from './fiis.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FiisController],
  providers: [FiisService],
  exports: [FiisService],
})
export class FiisModule {}
