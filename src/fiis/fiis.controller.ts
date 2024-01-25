import { Controller, Get, Query } from '@nestjs/common';
import { FiisService } from './fiis.service';

@Controller({ path: 'fiis' })
export class FiisController {
  constructor(private fissService: FiisService) {}

  @Get()
  async getFiis(
    @Query('p_vp') p_vp: number,
    @Query('p_vpmin') p_vpmin: number,
    @Query('dy') dy: number,
    @Query('segment') segment: string,
  ) {
    const fiis = await this.fissService.getFiis();
    return this.fissService.applyFilters(fiis, { p_vp, segment, p_vpmin, dy });
  }
  
  
  @Get('today')
  async getFiisToday() {
    return await this.fissService.getFiisToday();
  }
}
