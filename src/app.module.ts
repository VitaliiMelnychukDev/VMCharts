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
    MongooseModule.forRoot(process.env.DB_URI)
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
