import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenPair, TokenPayloadDTO } from './dto/authentication.dto';
import { TokenExpiredError, sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { OAuthGoogleDto } from './dto/oAuthGooge.dto';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../../prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  generateTokenPair(generateTokenData: TokenPayloadDTO): TokenPair {
    const refreshToken = sign(
      {
        data: generateTokenData,
      },
      this.configService.get('JWT_SECRET'),
      { expiresIn: '7d' },
    );

    const accessToken = sign(
      {
        data: generateTokenData,
      },
      this.configService.get('JWT_SECRET'),
      { expiresIn: '1d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  verifySync(accessToken: string) {
    let jwtPayload: TokenPayloadDTO;

    verify(
      accessToken,
      this.configService.get('JWT_SECRET'),
      (err, payload) => {
        if (err) {
          console.error(err.message);
          if (err.message === 'jwt expired') {
            throw new UnauthorizedException('Token expirado');
          } else {
            throw new UnauthorizedException(err.message);
          }
        }

        jwtPayload = payload as TokenPayloadDTO;
      },
    );

    return jwtPayload;
  }

  async oAuthGoogle(authData: OAuthGoogleDto) {
    const oAuth2Client = new OAuth2Client(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      'postmessage',
    );

    try {
      const { tokens } = await oAuth2Client.getToken(authData.code);
      const userData = this.jwtService.decode(tokens.id_token);
      const verifyUser = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (!verifyUser) {
        await prisma.user.create({
          data: {
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
          },
        });
      }

      const refreshToken = this.jwtService.sign(
        { email: userData.email },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '5d',
        },
      );

      return { tokens, userData, refreshToken };
    } catch (error) {
      console.error('Error during token exchange:', error.message);
      return error;
    }
  }
}
