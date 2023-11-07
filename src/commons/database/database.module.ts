import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Product } from '../../modules/products/entity/product.entity';

dotenv.config();

const configService = new ConfigService();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      models: [Product],
      autoLoadModels: true,
      synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
      logging: false,
    }),
  ],
})
export class DatabaseModule {}
