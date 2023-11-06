import { Controller, HttpStatus, HttpCode, Query, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { SearchProductUsecase } from './search-product.usecase';
import { BaseProductDTO } from '../../dto/base-product.dto';
import { ProductQueryDTO } from './search-product.dto';
import { Product } from '../../entity/product.entity';

@ApiTags('Produtos')
@Controller('produtos')
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@ApiBadRequestResponse({ description: 'Invalid query parameters' })
export class SearchProductController {
  constructor(private searchProductUsecase: SearchProductUsecase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Returns a product list' })
  @ApiOkResponse({
    description: 'A list of products has been successfully retrieved',
    type: [BaseProductDTO], // This should match the actual DTO returned by the usecase
  })
  searchProducts(@Query() query: ProductQueryDTO): Promise<Product[]> {
    return this.searchProductUsecase.getProducts(query);
  }
}
