import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../service/product.service';
import { SearchProductUsecase } from '../search-product.usecase';
import { ProductEntity } from '../../../entity/product.entity';
import { ProductQueryDTO } from '../search-product.dto';

describe('SearchProductUsecase', () => {
  let searchProductUsecase: SearchProductUsecase;
  let productService: ProductService;

  beforeEach(async () => {
    const productServiceMock = {
      getProductByKey: jest.fn().mockResolvedValue(new ProductEntity()),
      getProducts: jest.fn().mockResolvedValue([new ProductEntity()]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchProductUsecase,
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
      ],
    }).compile();

    searchProductUsecase =
      module.get<SearchProductUsecase>(SearchProductUsecase);
    productService = module.get<ProductService>(ProductService);
  });

  it('getProductByKey should call productService with correct key', async () => {
    const key = 'some-key';
    const expectedResult = new ProductEntity();

    jest
      .spyOn(productService, 'getProductByKey')
      .mockResolvedValue(expectedResult);

    const result = await searchProductUsecase.getProductByKey(key);

    expect(productService.getProductByKey).toHaveBeenCalledWith(key);
    expect(result).toEqual(expectedResult);
  });

  it('getProducts should call productService with correct query data', async () => {
    const queryData: ProductQueryDTO = { row_count: 5, row_skip: 1 };
    const expectedResult = [new ProductEntity()];

    jest.spyOn(productService, 'getProducts').mockResolvedValue(expectedResult);

    const result = await searchProductUsecase.getProducts(queryData);

    expect(productService.getProducts).toHaveBeenCalledWith(queryData);
    expect(result).toEqual(expectedResult);
  });
});
