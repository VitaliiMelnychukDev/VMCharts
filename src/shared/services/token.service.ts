import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt  from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TokenError } from '../types/error';
import { IAccessTokenBody, IAccessTokenPayload, IRefreshTokenPayload } from '../types/token';

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {
  }

  public generateAccessToken(data: IAccessTokenPayload): string {
    return this.generateToken(data, this.getAccessTokenExpiration());
  }

  public generateRefreshToken(data: IRefreshTokenPayload): string {
    return this.generateToken(data, this.getRefreshTokenExpiration());
  }

  public getAccessTokenPayload(token: string): IAccessTokenPayload {
    const accessTokenBody: IAccessTokenBody = this.verifyAndGeTokenData(token);

    return {
      userId: accessTokenBody.userId,
      name: accessTokenBody.name,
      roles: accessTokenBody.roles,
      email: accessTokenBody.email
    }
  }

  public verifyAndGeTokenData(token: string): any {
    try {
      return  jwt.verify(token, this.getSecret());
    } catch(e) {
      throw new BadRequestException(TokenError.TokenIsNotValid);
    }
  }

  private generateToken(data: any, expiresIn: number): string {
    return jwt.sign(data, this.getSecret(), {expiresIn});
  }

  private getSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  private getAccessTokenExpiration(): number {
    return this.configService.get<number>('ACCESS_TOKEN_EXPIRATION');
  }

  private getRefreshTokenExpiration(): number {
    return this.configService.get<number>('REFRESH_TOKEN_EXPIRATION');
  }
}