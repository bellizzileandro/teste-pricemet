import { Injectable } from '@nestjs/common';
import { BaseProductDTO } from '../dto/base-product.dto';
import { ProductQueryDTO } from '../usecases/search/search-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../entity/product.entity';
import { Transaction } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async getProductByKey(key: string): Promise<Product | undefined> {
    return this.productModel.findOne({ where: { key } });
  }

  async getProducts(query: ProductQueryDTO): Promise<Product[]> {
    let limit = 100;
    const offset = query?.row_skip || 0;

    if (query?.row_count === -1) limit = undefined;

    return this.productModel.findAll({ limit, offset });
  }

  // Método para iniciar e retornar uma transação
  async startTransaction(): Promise<Transaction> {
    return this.productModel.sequelize?.transaction();
  }

  // Método para comitar uma transação
  async commitTransaction(transaction: Transaction): Promise<void> {
    await transaction.commit();
  }

  // Método para reverter uma transação
  async rollbackTransaction(transaction: Transaction): Promise<void> {
    await transaction.rollback();
  }

  async buildProduct(product: BaseProductDTO) {
    const data = {
      ...product,
      data_hora_insercao: new Date(product.data_hora_insercao),
    };
    return await this.productModel.create(data);
  }

  // Método para realizar a inserção em massa com uma transação existente
  async bulkInsert(
    products: BaseProductDTO[],
    transaction: Transaction,
  ): Promise<void> {
    await this.productModel.bulkCreate(products, { transaction });
  }
}
