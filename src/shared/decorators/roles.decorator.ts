import { SetMetadata } from '@nestjs/common';
import { Role, rolesDecoratorKey } from '../types/role';

export const Roles = (...roles: Role[]) => SetMetadata(rolesDecoratorKey, roles);