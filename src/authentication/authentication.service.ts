import { Injectable } from '@nestjs/common';
import { GenerateTokenDTO, TokenPair } from './dto/authentication';
import jwt from "jsonwebtoken"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(private configService: ConfigService) {}

  generateTokenPair(generateTokenData: GenerateTokenDTO): TokenPair {
    const refreshToken = jwt.sign({
      data: generateTokenData 
    }, this.configService.get("JWT_SECRET"), { expiresIn: 60 * 60 });   

    const accessToken = jwt.sign({
      data: generateTokenData 
    }, this.configService.get("JWT_SECRET"), { expiresIn: 60 * 60 });

    return {
      accessToken,
      refreshToken
    } 
  }

  authenticate(accessToken: string) {
    jwt.verify(accessToken, this.configService.get("JWT_SECRET"), (err) => {
      if (err) {
        throw new Error(err.message)
      }
    })
  }
}
