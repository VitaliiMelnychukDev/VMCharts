import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles-guard.service';
import { TokenService } from './services/token.service';



@Module({
  providers: [
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