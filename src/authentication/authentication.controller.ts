import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { OAuthGoogleDto } from './dto/oAuthGooge.dto';

@Controller({ path: 'authentication' })
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post()
  @UseGuards()
  async verifyAuth(@Body('refreshToken') refreshToken: string) {
    return this.authenticationService.verifySync(refreshToken);
  }

  @Post('oauth/google')
  async oAuthGoogle(@Body() authData: OAuthGoogleDto) {
    return await this.authenticationService.oAuthGoogle(authData);
  }
}
