import { Injectable } from '@nestjs/common';
import { TokenPair, TokenPayloadDTO } from './dto/authentication';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(private configService: ConfigService) {}

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
    let jwtPayload: TokenPayloadDTO 
    verify(accessToken, this.configService.get('JWT_SECRET'), (err, payload) => {
      if (err) {
        throw new Error(err.message);
      }

      console.log(payload)

      jwtPayload = payload as TokenPayloadDTO
    });

    return jwtPayload
  }
}
