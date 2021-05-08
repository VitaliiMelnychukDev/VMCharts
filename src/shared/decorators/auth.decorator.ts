import { SetMetadata } from '@nestjs/common';
import { authDecoratorKay } from '../types/auth';

export const AuthNeeded = () => SetMetadata(authDecoratorKay, true);