import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response) {
    const { refresh_token, access_token, ...user } =
      await this.authService.login(req.user);

    response.cookie('act', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    response.cookie('rft', refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    return user;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response) {
    response.cookie('act', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    response.cookie('rft', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    return;
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req, @Res({ passthrough: true }) response) {
    const { access_token } = await this.authService.refreshToken(req.user);

    response.cookie('act', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    return;
  }
}
