import { Controller, Get, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller({ path: 'crypto' })
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('price')
  async getSymbolPrice(@Query('symbol') symbol: string) {
    return await this.cryptoService.findPriceBySymbol(symbol);
  }

  @Get('lsr')
  async findLSR() {
    return await this.cryptoService.findLSR();
  }

  @Get('weekly/fibonacci')
  async fibonacciHystoryBySymbol(@Query('symbol') symbol: string) {
    return await this.cryptoService.fibonacciHystoryBySymbol(symbol);
  }

  @Get('CVD')
  async calculateCVDBySymbol(@Query('symbol') symbol: string) {
    return await this.cryptoService.calculateCVDBySymbol(symbol);
  }
}
