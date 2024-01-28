import { Controller, Get, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller({ path: 'authentication' })
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {} 

  @Get()
  async findUser(@Query('access_token') accessToken: string) {
    try {
      return this.authenticationService.authenticate(accessToken);
    } catch(error: any) {
      throw new Error(error.message)
    }
  }
}
