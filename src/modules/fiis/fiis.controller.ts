import { Controller, Get } from '@nestjs/common';
import { FiisService } from './fiis.service';

@Controller({ path: 'fiis' })
export class FiisController {
  constructor(private fissService: FiisService) {}

  @Get()
  async getFiis() {
    return await this.fissService.getFiis();
  }
  @Get('today')
  async getFiisToday() {
    return await this.fissService.getFiisToday();
  }
}
