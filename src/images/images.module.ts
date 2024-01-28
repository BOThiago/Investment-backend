import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
