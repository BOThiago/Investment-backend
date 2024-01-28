import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { prisma } from 'prisma/client';

@Injectable()
export class ImagesService {

  async getImages(company_id: number) {
      const square = await this.getImageSquare(company_id);
      const cover = await this.getImageCover(company_id);
      return {square,cover}
  }

  async getImageSquare(companyid: number) {
    const existImage = await prisma.company.findUnique({
      where:{
        id: companyid
      }
    })

    if(existImage.square) {
      return existImage.square}

    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://statusinvest.com.br/img/company/square/${companyid}.jpg`,
      headers: {
        Cookie: '_adasys=fb27a2f6-b1a5-414d-8053-90dcc6e74a9a',
        ['User-Agent']: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36`,
      },
      responseType: 'arraybuffer',
    };
    const response: AxiosResponse<ArrayBuffer> = await axios(config);
    const imageBufferCover = Buffer.from(response.data);
    const base64String = imageBufferCover.toString('base64');
    return base64String;
  }

  async getImageCover(companyid: number) {
    const existImage = await prisma.company.findUnique({
      where:{
        id: companyid
      }
    })

    if(existImage.cover) 
      return existImage.cover

    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://statusinvest.com.br/img/company/cover/${companyid}.jpg`,
      headers: {
        Cookie: '_adasys=fb27a2f6-b1a5-414d-8053-90dcc6e74a9a',
        ['User-Agent']: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36`,
      },
      responseType: 'arraybuffer',
    };
    const response: AxiosResponse<ArrayBuffer> = await axios(config);
    const imageBufferCover = Buffer.from(response.data);
    const base64String = imageBufferCover.toString('base64');
    return base64String;
  }
}
