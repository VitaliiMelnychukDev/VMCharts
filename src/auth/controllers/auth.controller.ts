import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthPath } from '../types/paths/auth';
import { UserService } from '../services/user.service';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IResponse } from '../../shared/types/response';
import { AuthMessage } from '../types/message';
import { LoginUserDto } from '../dtos/login-user.dto';
import { AuthService } from '../services/auth.service';
import { ILoginData, ILoginResponse, IRefreshTokenResponse, ITokenData } from '../types/auth';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ValidateTokenDto } from '../dtos/validate-token.dto';
import { StatusCodes } from 'http-status-codes';
import { AuthNeeded } from '../../shared/decorators/auth.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/types/role';

@Controller(AuthPath.Base)
export class AuthController {
  constructor(private userService: UserService, private authService: AuthService) {
  }

  @AuthNeeded()
  @Roles(Role.Admin)
  @Post(AuthPath.Register)
  public async register(@Body(new ValidationPipe()) user: CreateUserDto): Promise<IResponse> {
    await this.userService.create(user);

    return {
      message: AuthMessage.UserCreationSuccess
    }
  }

  @HttpCode(StatusCodes.OK)
  @Post(AuthPath.Login)
  public async login(@Body(new ValidationPipe()) payload: LoginUserDto): Promise<ILoginResponse> {
    const loginData: ILoginData = await this.authService.login(payload);

    return {
      data: loginData
    }
  }

  @HttpCode(StatusCodes.OK)
  @Post(AuthPath.Refresh)
  public async refresh(@Body(new ValidationPipe()) payload: RefreshTokenDto): Promise<IRefreshTokenResponse> {
    const refreshTokenData: ITokenData = await this.authService.refreshToken(payload.refreshToken);

    return {
      data: refreshTokenData
    }
  }

  @HttpCode(StatusCodes.OK)
  @Post(AuthPath.Validate)
  public validate(@Body(new ValidationPipe()) payload: ValidateTokenDto): IResponse {
     this.authService.validateToken(payload.accessToken);

    return {
      message: AuthMessage.TokenValidationSuccess
    }
  }

  @HttpCode(StatusCodes.OK)
  @Post(AuthPath.Logout)
  public async logout(@Body(new ValidationPipe()) payload: RefreshTokenDto): Promise<IResponse> {
    await this.authService.logout(payload.refreshToken);

    return {
      message: AuthMessage.LogoutSuccess
    }
  }
}