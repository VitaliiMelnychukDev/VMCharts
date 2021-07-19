import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { clientName } from '../types/redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheClient {
  private client: any;
  private readonly ttl;

  constructor(private redisService: RedisService, private configService: ConfigService) {
    this.ttl = this.configService.get<number>('REDIS_LIVE_TIME');
  }

  async get<T>(key: string): Promise<T> {
    const redisClient = await this.getClient();

    return JSON.parse(await redisClient.get(key));
  }

  async delete(key: string): Promise<void> {
    const redisClient = await this.getClient();
    await redisClient.del(key);
  }

  async set<T>(key: string, data: T): Promise<any> {
    const redisClient = await this.getClient();

    return await redisClient.setex(key,this.ttl, JSON.stringify(data));
  }

  private async getClient(): Promise<any> {
    if (!this.client) {
      this.client = await this.redisService.getClient(clientName);
    }

    return this.client;
  }
}