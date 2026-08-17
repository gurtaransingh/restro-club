import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/users.service';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'Restro Club Enterprise NestJS API',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('auth/login')
  login(@Body() body: { username?: string; id?: string; password?: string }) {
    const identifier = body.username || body.id || '';
    const password = body.password || '';
    return this.authService.login(identifier, password);
  }

  @Post('auth/register')
  register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }
}
