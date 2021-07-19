import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChartModule } from './charts/chart.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    ChartModule,
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}:27017/vm_charts`)
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
