import { Injectable } from '@nestjs/common';
import { ProductService } from '../../service/product.service';
import { ProductQueryDTO } from './search-product.dto';
import { Product } from '../../entity/product.entity';

@Injectable()
export class SearchProductUsecase {
  constructor(private productService: ProductService) {}

  async getProductByKey(key: string): Promise<Product> {
    return this.productService.getProductByKey(key);
  }

  async getProducts(data: ProductQueryDTO): Promise<Product[]> {
    return this.productService.getProducts(data);
  }
}
