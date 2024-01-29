import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller({ path: 'images' })
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get('cover')
  async getImageCover(@Query('companyid') companyid: string) {
    return await this.imagesService.getImageCover(Number(companyid));
  }
  @Get('square')
  async getImageSquare(@Query('companyid') companyid: string) {
    return await this.imagesService.getImageSquare(Number(companyid));
  }
}
