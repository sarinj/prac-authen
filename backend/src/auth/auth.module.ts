import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { JWT_SECRET } from 'src/constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
