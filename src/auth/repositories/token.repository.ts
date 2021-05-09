import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TokenSchemaName } from '../types/schema/token';
import { Model } from "mongoose";
import { Token, TokenDocument } from '../schemas/token.schema';

@Injectable()
export class TokenRepository {
  private readonly refreshTokenField = 'refreshToken';

  private readonly userField = 'user';

  constructor(@InjectModel(TokenSchemaName) private tokenModel: Model<TokenDocument>) {}

  public async findByRefreshTokenAndRemove(refreshToken: string): Promise<Token | null> {
    const filters: Record<string, any> = {};
    filters[this.refreshTokenField] = refreshToken;

    return await this.tokenModel.findOneAndRemove(filters).populate(this.userField).exec();
  }

  public async findByRefreshToken(refreshToken: string): Promise<Token | null> {
    const filters: Record<string, any> = {};
    filters[this.refreshTokenField] = refreshToken;

    return await this.tokenModel.findOne(filters).exec();
  }

  public async removeByUserId(userId: string): Promise<void> {
    const filters: Record<string, any> = {};
    filters[this.userField] = userId;

    await this.tokenModel.deleteMany(filters).exec();
  }
}