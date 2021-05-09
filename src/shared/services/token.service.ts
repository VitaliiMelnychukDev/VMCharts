import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt  from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TokenError } from '../types/error';

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {
  }

  public generateAccessToken(data: any): string {
    return this.generateToken(data, this.getAccessTokenExpiration());
  }

  public generateRefreshToken(data: any): string {
    return this.generateToken(data, this.getRefreshTokenExpiration());
  }

  public verify(token: string): any {
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