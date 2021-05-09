import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../dtos/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from '../schemas/user.schema';
import { HashService } from './hash.service';
import { AuthError } from '../types/error';
import { UserRepository } from '../repositories/user.repository';
import { TokenService } from '../../shared/services/token.service';
import { ILoginData, IAccessToken, IRefreshTokenPayload } from '../types/auth';
import { Token, TokenDocument } from '../schemas/token.schema';
import { TokenSchemaName } from '../types/schema/token';
import { TokenRepository } from '../repositories/token.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(TokenSchemaName) private tokenModel: Model<TokenDocument>,
    private hashService: HashService,
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private tokenRepository: TokenRepository
  ) {}

  public async login(loginData: LoginUserDto): Promise<ILoginData> {
    try {
      const user: User | null = await this.userRepository.findByEmail(loginData.email);

      if (!user) {
        throw new UnauthorizedException(AuthError.LoginUserFail);
      }

      const passwordIsValid: boolean = await this.hashService.isMatch(loginData.password, user.password);

      if (!passwordIsValid) {
        throw new UnauthorizedException(AuthError.LoginUserFail);
      }

      return await this.generateAndSaveTokens(user);
    } catch (e) {
      throw new UnauthorizedException(AuthError.LoginUserFail);
    }
  }

  public async refreshToken(refreshToken: string): Promise<ILoginData> {
    try {
      this.tokenService.verify(refreshToken);
      const token: Token | null = await this.tokenRepository.findByRefreshTokenAndRemove(refreshToken);

      if (!token) {
        throw new BadRequestException(AuthError.RefreshTokenFail);
      }

      return await this.generateAndSaveTokens(token.user);
    } catch {
      throw new BadRequestException(AuthError.RefreshTokenFail);
    }
  }

  public validateToken(accessToken: string): IAccessToken {
    return this.tokenService.verify(accessToken);
  }

  public async logout(refreshToken: string): Promise<void> {
    try {
      const tokenPayload: IRefreshTokenPayload = this.tokenService.verify(refreshToken);
      const token: Token | null = await this.tokenRepository.findByRefreshToken(refreshToken);

      if (!token) {
        throw new BadRequestException(AuthError.LogoutFail);
      }

      await this.tokenRepository.removeByUserId(tokenPayload.id);
    } catch {
      throw new BadRequestException(AuthError.LogoutFail);
    }
  }

  private async generateAndSaveTokens(user: User): Promise<ILoginData> {
    const accessToken: string = this.tokenService.generateAccessToken({
      id: user._id,
      email: user.email,
      roles: user.roles
    });

    const refreshToken: string = this.tokenService.generateRefreshToken({
      id: user._id
    })

    await this.saveRefreshToken(user._id, refreshToken);

    return {
      accessToken,
      refreshToken
    }
  }

  private async saveRefreshToken(userId: string, refreshToken: string): Promise<Token> {
    const token: TokenDocument = new this.tokenModel({
      user: userId,
      refreshToken
    });

    return await token.save();
  }
}