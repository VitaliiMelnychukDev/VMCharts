import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role, rolesDecoratorKey } from '../types/role';
import { IAccessTokenPayload } from '../types/token';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const roles: Role[] = this.reflector.get<Role[]>(rolesDecoratorKey, context.getHandler());
    if (!roles || !roles.length) {
      return true;
    }

    roles.push(Role.Admin);

    const user: IAccessTokenPayload | undefined = request.user;

    return !(!user || !this.userHasRole(user, roles));
  }

  private userHasRole(user: IAccessTokenPayload, acceptedRoles: Role[]): boolean {
    if (!user.roles || !user.roles.length) {
      return false;
    }

    return !!user.roles.find((role: Role) => {
      return acceptedRoles.includes(role);
    })
  }
}