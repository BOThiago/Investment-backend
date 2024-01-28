import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Stocks, Dividend } from './dto/stocks.dto';
import { prisma } from 'prisma/client';

@Injectable()
export class StocksService {
  async getStocks(): Promise<Stocks[]> {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://statusinvest.com.br/category/advancedsearchresultpaginated?search=%7B%22Segment%22%3A%22%22%2C%22Gestao%22%3A%22%22%2C%22my_range%22%3A%220%3B20%22%2C%22dy%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_vp%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22percentualcaixa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22numerocotistas%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22dividend_cagr%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22cota_cagr%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22liquidezmediadiaria%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22patrimonio%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22valorpatrimonialcota%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22numerocotas%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22lastdividend%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%7D&take=10000&CategoryType=1',
      headers: {
        Cookie: '_adasys=fb27a2f6-b1a5-414d-8053-90dcc6e74a9a',
        ['User-Agent']: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data.list)
      .catch((error) => console.log(error));
  }

  async importStocks() {
    const stocks = await this.getStocks();
    let count = 0;
    for (const stock of stocks) {
      const existingStock = await prisma.company.findUnique({
        where: {
          id: stock.companyid,
        },
      });
      if (!existingStock) {
        await prisma.company.create({
          data: {
            id: stock.companyid,
            company: stock.companyname,
          },
        });
        count++;
        console.log(
          `Stock with companyid ${stock.companyid} and name ${stock.companyname} inserted.`,
        );
      }
    }
    return count + ' companies imported';
  }

  async getStock(ticker: string): Promise<Stocks> {
    const stocks = await this.getStocks();
    return stocks.filter((item) => item.ticker == ticker.toUpperCase())[0];
  }

  async getStockDividend(code: string): Promise<Dividend> {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://statusinvest.com.br/acao/companytickerprovents?companyName=${code}&ticker=${code}&chartProventsType=2`,
      headers: {
        Cookie: '_adasys=fb27a2f6-b1a5-414d-8053-90dcc6e74a9a',
        ['User-Agent']: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  async getStocksToday(): Promise<Stocks[]> {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://statusinvest.com.br/acao/getaltabaixa?IndiceCode=ibovespa&Filter=',
      headers: {
        Cookie: '_adasys=fb27a2f6-b1a5-414d-8053-90dcc6e74a9a',
        ['User-Agent']: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36`,
      },
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  async getStocksGraham(): Promise<object> {
    const response = await this.getStocks();

    const valoresIntrinsecos = response
      .map((stocks) => {
        if (
          stocks.price == 0 ||
          stocks.liquidezmediadiaria < 100000 ||
          !stocks.liquidezmediadiaria ||
          stocks.p_vp < 0.3
        )
          return null;
        const precoJusto = Math.sqrt(stocks.lpa * stocks.vpa * 22.2);
        if (precoJusto !== null && !isNaN(precoJusto)) {
          const upsideGraham =
            ((precoJusto - stocks.price) / stocks.price) * 100;

          return {
            companyid: stocks.companyid,
            companyname: stocks.companyname,
            ticker: stocks.ticker,
            preco: stocks.price,
            precoJusto,
            upsideGraham,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
    return valoresIntrinsecos.sort((a, b) => b.upsideGraham - a.upsideGraham);
  }

  async getStocksBazin(ticker: string): Promise<object> {
    const dividend = await this.getStockDividend(ticker);

    const assetEarningsYearlyModels = dividend.assetEarningsYearlyModels;
    const lastFiveYears = assetEarningsYearlyModels.slice(-5);
    const sum = lastFiveYears.reduce(
      (accumulator, model) => accumulator + model.value,
      0,
    );
    const average = sum / lastFiveYears.length / 0.06;

    return {
      Ticker: ticker,
      PrecoTeto: average.toFixed(2),
    };
  }
}
