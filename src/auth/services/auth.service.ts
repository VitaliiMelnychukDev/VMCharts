import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../dtos/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from '../schemas/user.schema';
import { HashService } from './hash.service';
import { AuthError } from '../types/error';
import { UserRepository } from '../repositories/user.repository';
import { TokenService } from '../../shared/services/token.service';
import { ILoginData, ITokenData, IUserData } from '../types/auth';
import { Token, TokenDocument } from '../schemas/token.schema';
import { TokenSchemaName } from '../types/schema/token';
import { TokenRepository } from '../repositories/token.repository';
import { IRefreshTokenPayload, IAccessTokenBody } from '../../shared/types/token';

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
    let user: User | null = null;

    try {
      user = await this.userRepository.findByEmail(loginData.email);
    } catch (e) {
      throw new UnauthorizedException(AuthError.LoginUserFail);
    }

    if (!user) {
      throw new UnauthorizedException(AuthError.LoginUserFail);
    }

    const passwordIsValid: boolean = await this.hashService.isMatch(loginData.password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException(AuthError.LoginUserFail);
    }

    const tokenData: ITokenData = await this.generateAndSaveTokens(user);

    delete user.password;

    return {
      ...tokenData,
      user: this.mapLoginUser(user)
    };
  }

  public async refreshToken(refreshToken: string): Promise<ITokenData> {
    this.tokenService.verifyAndGeTokenData(refreshToken);
    let token: Token | null = null;

    try {
      token = await this.tokenRepository.findByRefreshTokenAndRemove(refreshToken);
    } catch {
      throw new BadRequestException(AuthError.RefreshTokenFail);
    }

    if (!token) {
      throw new BadRequestException(AuthError.RefreshTokenFail);
    }

    return await this.generateAndSaveTokens(token.user);
  }

  public validateToken(accessToken: string): IAccessTokenBody {
    return this.tokenService.verifyAndGeTokenData(accessToken);
  }

  public async logout(refreshToken: string): Promise<void> {
    let tokenPayload: IRefreshTokenPayload = this.tokenService.verifyAndGeTokenData(refreshToken);
    let token: Token | null = await this.tokenRepository.findByRefreshToken(refreshToken);


    try {
      token = await this.tokenRepository.findByRefreshToken(refreshToken);
    } catch {
      throw new BadRequestException(AuthError.LogoutFail);
    }

    if (!token) {
      throw new BadRequestException(AuthError.LogoutFail);
    }

    await this.tokenRepository.removeByUserId(tokenPayload.userId);
  }

  private mapLoginUser(user: User): IUserData {
    return {
      name: user.name,
      roles: user.roles,
      email: user.email
    }
  }

  private async generateAndSaveTokens(user: User): Promise<ITokenData> {
    const accessToken: string = this.tokenService.generateAccessToken({
      userId: user._id,
      email: user.email,
      roles: user.roles,
      name: user.name
    });

    const refreshToken: string = this.tokenService.generateRefreshToken({
      userId: user._id
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