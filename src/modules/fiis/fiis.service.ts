import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FiisService {
  async getFiis() {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://statusinvest.com.br/category/advancedsearchresultpaginated?search=%7B%22Segment%22%3A%22%22%2C%22Gestao%22%3A%22%22%2C%22my_range%22%3A%220%3B20%22%2C%22dy%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_vp%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22percentualcaixa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22numerocotistas%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22dividend_cagr%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22cota_cagr%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22liquidezmediadiaria%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22patrimonio%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22valorpatrimonialcota%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22numerocotas%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22lastdividend%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%7D&take=10000&CategoryType=2',
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
  async getFiisToday() {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://statusinvest.com.br/fii/getaltabaixa?IndiceCode=ifix&Filter=',
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
  
}
