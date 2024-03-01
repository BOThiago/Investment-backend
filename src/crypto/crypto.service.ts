import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

interface CryptoData {
  symbol: string;
  priceChangePercent: string;
  companyId: string;
}

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

    const fibonacciLevels = priceHistory.map((item) => {
      const weeklyMin = parseFloat(item[3]);
      const weeklyMax = parseFloat(item[2]);

      const range = weeklyMax - weeklyMin;
      const fib38 = weeklyMin + range * 0.382;
      const fib50 = weeklyMin + range * 0.5;
      const fib61 = weeklyMin + range * 0.618;

      return {
        price: parseFloat(item[4]),
        minPrice: weeklyMin,
        maxPrice: weeklyMax,
        fib38,
        fib50,
        fib61,
      };
    });

    return { symbol, maxPrice, minPrice, fibonacciLevels };
  }

  async calculateCVDBySymbol(symbol: string): Promise<any> {
    const priceHistory = await this.getSymbolPriceHistory(symbol);

    const closingPrices = priceHistory.map((item) => parseFloat(item[4]));

    const volumes = priceHistory.map((item) => parseFloat(item[8]));

    const cvd = volumes.reduce((acc, volume, index) => {
      const delta =
        index === 0 ? 0 : closingPrices[index] - closingPrices[index - 1];
      return acc + delta * volume;
    }, 0);

    return { symbol, cvd };
  }

  async getTopGainers(response: AxiosResponse): Promise<string[]> {
    const sortedData = response.data
      .filter(
        (crypto: CryptoData) =>
          parseFloat(crypto.priceChangePercent) > 0 &&
          crypto.symbol.endsWith('USDT'),
      )
      .sort(
        (a, b) =>
          parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent),
      )
      .slice(0, 5);

    return sortedData.map((crypto: CryptoData) => ({
      code: crypto.symbol,
      resultPercentageValue: crypto.priceChangePercent,
      companyId: crypto.companyId,
    }));
  }

  async getTopLosers(response: AxiosResponse): Promise<string[]> {
    const sortedData = response.data
      .filter(
        (crypto: CryptoData) =>
          parseFloat(crypto.priceChangePercent) < 0 &&
          crypto.symbol.endsWith('USDT'),
      )
      .sort(
        (a, b) =>
          parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent),
      )
      .slice(0, 5);

    return sortedData.map((crypto: CryptoData) => ({
      code: crypto.symbol,
      resultPercentageValue: crypto.priceChangePercent,
      companyId: crypto.companyId,
    }));
  }

  async topCryptos() {
    try {
      const response: AxiosResponse = await axios.get('/ticker/24hr', {
        baseURL: this.apiUrl,
      });
      const [topGainers, topLosers] = await Promise.all([
        this.getTopGainers(response),
        this.getTopLosers(response),
      ]);
      return { topGainers, topLosers };
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      throw error;
    }
  }
}
