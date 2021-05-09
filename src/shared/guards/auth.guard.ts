import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role, rolesDecoratorKey } from '../types/role';
import { Reflector } from '@nestjs/core';
import { authDecoratorKay } from '../types/auth';
import { TokenService } from '../services/token.service';
import { TokenHelper } from '../helpers/token.helper';
import { IAccessTokenPayload } from '../types/token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();

    const authNeeded: boolean | undefined = this.reflector.get<boolean | undefined>(authDecoratorKay, context.getHandler());

    if (!authNeeded) {
      return true;
    }

    const authorizationToken = request.headers.authorization;

    if (!authorizationToken) {
      return false
    }

    try {
      const jwtToken: string = TokenHelper.parseToken(authorizationToken);
      const parsedToken: IAccessTokenPayload = this.tokenService.verify(jwtToken);
      request.user = parsedToken;

      return true;
    } catch {
      return false;
    }
  }
}