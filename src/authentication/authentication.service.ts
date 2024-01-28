import { Injectable } from '@nestjs/common';
import { GenerateTokenDTO, TokenPair } from './dto/authentication';
import { sign, verify } from "jsonwebtoken"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(private configService: ConfigService) {}

  generateTokenPair(generateTokenData: GenerateTokenDTO): TokenPair {
    const refreshToken = sign({
      data: generateTokenData 
    }, this.configService.get("JWT_SECRET"), { expiresIn: '7d' });   

    const accessToken = sign({
      data: generateTokenData 
    }, this.configService.get("JWT_SECRET"), { expiresIn: '1d' });

    return {
      accessToken,
      refreshToken
    } 
  }

  authenticate(accessToken: string) {
    verify(accessToken, this.configService.get("JWT_SECRET"), (err) => {
      if (err) {
        throw new Error(err.message)
      }
    })
  }
}
