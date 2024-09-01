import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategyService } from './strategies/local-strategy.service';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategyService],
})
export class AuthModule {}
