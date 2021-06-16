import { Controller, Get, Req } from '@nestjs/common';
import { AccountPath } from '../types/paths/account';
import { AuthNeeded } from '../../shared/decorators/auth.decorator';
import { IRequest } from '../../shared/types/request';
import { IAccountResponse } from '../types/account';

@Controller(AccountPath.Base)
export class AccountController {

  @AuthNeeded()
  @Get()
  get(@Req() request: IRequest): IAccountResponse {
    return {
      data: request.user
    };
  }
}