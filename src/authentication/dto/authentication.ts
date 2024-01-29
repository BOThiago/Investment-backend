export class TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class TokenPayloadDTO {
    email: string
    name: string
}

export class GenerateTokenDTO {
  name: string;
  email: string;
}
