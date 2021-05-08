import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { TokenService } from './services/token.service';
import { AuthGuard } from './guards/auth.guard';



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
    TokenService
  ],
  exports: [TokenService]
})
export class SharedModule {

}