import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseProductDTO } from '../../dto/base-product.dto';
import { validateDTO } from './validation';
import { ProductService } from '../../service/product.service';

@Injectable()
export class CreateProductUsecase {
  private readonly BATCH_SIZE = this.configService.get<number>('BATCH_SIZE');
  private readonly logger: Logger = new Logger(CreateProductUsecase.name);

  constructor(
    private configService: ConfigService,
    private productService: ProductService,
  ) {}

  async bulkCreate(data: BaseProductDTO[]): Promise<string> {
    let total = 0;

    const transaction = await this.productService.startTransaction();

    try {
      for (let i = 0; i < data.length; i += this.BATCH_SIZE) {
        const chunk = data.slice(i, i + this.BATCH_SIZE);

        const validationPromises = chunk.map((product) =>
          validateDTO(BaseProductDTO, product),
        );
        await Promise.all(validationPromises);

        await this.productService.bulkInsert(chunk, transaction);
        total += chunk.length;
        this.logger.log(
          `Successfully processed batch of size: ${total} chunks`,
        );
      }

      await this.productService.commitTransaction(transaction); // Commita a transação se tudo ocorrer bem
      this.logger.log(`Successfully inserted ${total} products.`);
    } catch (error) {
      await this.productService.rollbackTransaction(transaction); // Rollback da transação em caso de erro
      this.logger.error(
        `Error during insert. Rolled back. Error: ${JSON.stringify(error)}`,
      );
      throw new BadRequestException({
        message: 'Database insert failed',
        error,
      });
    }

    return `${total} items registered.`;
  }
}
