import { Controller, Get, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller({ path: 'stocks' })
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Get()
  async getStocks() {
    return await this.stocksService.getStocks();
  }

  @Get('import')
  async importStocks() {
    this.stocksService.importStocks();
    return "Importing"
  }

  @Get('stock')
  async getStocksByTicker(@Query('ticker') ticker: string) {
    return await this.stocksService.getStock(ticker);
  }

  @Get('today')
  async getStocksToday() {
    return await this.stocksService.getStocksToday();
  }

  @Get('dividend')
  async getStockDividend(@Query('ticker') ticker: string) {
    return await this.stocksService.getStockDividend(ticker);
  }

  @Get('graham')
  async getStocksGraham() {
    return await this.stocksService.getStocksGraham();
  }

  @Get('bazin')
  async getStocksBazin(@Query('ticker') ticker: string) {
    return await this.stocksService.getStocksBazin(ticker);
  }
}
