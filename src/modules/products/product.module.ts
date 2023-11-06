import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../commons/database/database.module';
import { SearchProductController } from './usecases/search/search-product.controller';
import { CreateProductController } from './usecases/create/create-product.controller';
import { SearchProductUsecase } from './usecases/search/search-product.usecase';
import { CreateProductUsecase } from './usecases/create/create-product.usecase';
import { ProductService } from './service/product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entity/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product]), DatabaseModule],
  controllers: [SearchProductController, CreateProductController],
  exports: [SearchProductUsecase, CreateProductUsecase],
  providers: [
    SearchProductUsecase,
    CreateProductUsecase,
    ProductService,
    Product,
  ],
})
export class ProductModule {}
