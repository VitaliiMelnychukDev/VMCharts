import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { TokenService } from './services/token.service';
import { AuthGuard } from './guards/auth.guard';
import { PaginationService } from './services/pagination.service';
import { BaseRepository } from './repository/base.repository';



@Module({
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
    PaginationService
  ],
  exports: [TokenService, PaginationService]
})
export class SharedModule {}