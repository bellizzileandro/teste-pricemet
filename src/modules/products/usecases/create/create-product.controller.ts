import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateProductUsecase } from './create-product.usecase';
import { BaseProductDTO } from '../../dto/base-product.dto';

@ApiTags('Produtos')
@Controller('produtos')
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
export class CreateProductController {
  constructor(private createProductUsecase: CreateProductUsecase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Insert a list of products on database.' })
  @ApiBody({ type: [BaseProductDTO] })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Products successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Invalid input data. Example: ' +
      JSON.stringify(
        {
          statusCode: 400,
          message: [
            'data_preco must be a valid date string',
            'qtd_estoque must be a non-negative integer',
          ],
          error: 'Bad Request',
        },
        null,
        2,
      ),
  })
  createProduct(@Body() data: BaseProductDTO[]): Promise<string> {
    return this.createProductUsecase.bulkCreate(data);
  }
}
