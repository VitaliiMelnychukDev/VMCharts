import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { TokenService } from './services/token.service';
import { AuthGuard } from './guards/auth.guard';
import { PaginationService } from './services/pagination.service';
import { RedisModule } from 'nestjs-redis';
import { configs } from './types/redis';
import { CacheClient } from './clients/cache.client';

@Module({
  imports: [
    RedisModule.register(configs),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    TokenService,
    PaginationService,
    CacheClient
  ],
  exports: [TokenService, PaginationService, CacheClient]
})
export class SharedModule {}