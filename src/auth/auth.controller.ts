import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('/login')
  login(@Body() loginUserDto: AuthCredentialsDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('/is-authorize')
  isAuthorize() {
    console.log('authorize');
  }
}
