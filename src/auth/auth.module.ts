import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategyService } from './strategies/local-strategy.service';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '3d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategyService],
  controllers: [AuthController],
})
export class AuthModule {}
