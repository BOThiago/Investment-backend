import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CryptoService {
  private readonly apiUrl = 'https://api.binance.com/api/v3';

  private async getSymbolPriceHistory(symbol: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://fapi.binance.com/fapi/v1/markPriceKlines?symbol=${symbol}&interval=1w`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async findLSR(): Promise<object> {
    try {
      const getFuturesSymbols = async () => {
        const exchangeInfoResponse = await axios.get(
          'https://fapi.binance.com/fapi/v1/exchangeInfo',
        );
        return exchangeInfoResponse.data.symbols
          .map((symbolData) => symbolData.symbol)
          .filter((symbol) => symbol.endsWith('USDT'));
      };

      const getLongShortRatio = async (symbol) => {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://fapi.binance.com/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=1d`,
          headers: {
            'Content-Type': 'application/json',
            'X-MBX-APIKEY': '{{binance-api-key}}',
          },
        };

        const longShortRatioResponse = await axios.request(config);
        const longShortData = longShortRatioResponse.data;
        return { symbol, longShortRatio: longShortData[0]?.longShortRatio };
      };

      const symbols = await getFuturesSymbols();
      const longShortRatioPromises = symbols.map((symbol) =>
        getLongShortRatio(symbol),
      );

      let longShortRatios = await Promise.all(longShortRatioPromises);
      longShortRatios = longShortRatios.filter((data) => data.longShortRatio);

      return longShortRatios.sort(
        (a, b) => a.longShortRatio - b.longShortRatio,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findPriceBySymbol(symbol: string): Promise<object> {
    const response = await axios.get(`${this.apiUrl}/ticker/price`, {
      params: { symbol },
    });

    return {
      symbol: symbol,
      price: parseFloat(response.data.price),
    };
  }

  async getSymbolPrice(symbol: string): Promise<number> {
    const response = await axios.get(`${this.apiUrl}/ticker/price`, {
      params: { symbol },
    });
    return parseFloat(response.data.price);
  }

  async fibonacciHystoryBySymbol(symbol: string): Promise<any> {
    const priceHistory = await this.getSymbolPriceHistory(symbol);

    const closingPrices = priceHistory.map((item) => parseFloat(item[4]));

    const maxPrice = Math.max(...closingPrices);
    const minPrice = Math.min(...closingPrices);

    // Calcular níveis de Fibonacci (exemplo usando 38.2%, 50% e 61.8%)
    const fibonacciLevels = closingPrices.map((price: number) => ({
      price,
      fib38: price * 0.382,
      fib50: price * 0.5,
      fib61: price * 0.618,
    }));

    return { symbol, maxPrice, minPrice, fibonacciLevels };
  }

  async calculateCVDBySymbol(symbol: string): Promise<any> {
    const priceHistory = await this.getSymbolPriceHistory(symbol);

    console.log(priceHistory);

    const closingPrices = priceHistory.map((item) => parseFloat(item[4]));

    const volumes = priceHistory.map((item) => parseFloat(item[8]));

    // Calcular o CVD (Cumulative Volume Delta)
    const cvd = volumes.reduce((acc, volume, index) => {
      const delta =
        index === 0 ? 0 : closingPrices[index] - closingPrices[index - 1];
      return acc + delta * volume;
    }, 0);

    return { symbol, cvd };
  }
}
