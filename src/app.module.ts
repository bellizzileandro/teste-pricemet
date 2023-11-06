import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './commons/database/database.module';
import LoggerRequestMiddleware from './system/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerRequestMiddleware)
      .exclude(
        { path: 'api-json', method: RequestMethod.GET },
        { path: 'api', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
