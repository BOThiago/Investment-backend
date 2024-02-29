import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { prisma } from 'prisma/client';

@Injectable()
export class ImagesService {
  async getImageSquare(companyid: number) {
    if (!companyid) return;

    const existImage = await prisma.company.findUnique({
      where: {
        id: companyid,
      },
    });

    if (existImage?.square) return existImage.square;

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
    return imageBufferCover.toString('base64');
  }

  async getImageCover(companyid: number) {
    if (!companyid) return;

    const existImage = await prisma.company.findUnique({
      where: {
        id: companyid,
      },
    });

    if (existImage?.cover) return existImage.cover;

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
    return imageBufferCover.toString('base64');
  }

  async getImages(companyId: number) {
    try {
      const [cover, square] = await Promise.all([
        this.getImageCover(companyId),
        this.getImageSquare(companyId),
      ]);
      return { cover, square };
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível encontrar as imagens do ativo !',
        error,
      );
    }
  }
}
