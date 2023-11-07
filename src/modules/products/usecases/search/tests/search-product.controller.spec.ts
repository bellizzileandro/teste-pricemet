import { Test, TestingModule } from '@nestjs/testing';
import { SearchProductController } from '../search-product.controller';
import { SearchProductUsecase } from '../search-product.usecase';
import { ProductQueryDTO } from '../search-product.dto';
import { ProductEntity } from '../../../entity/product.entity';

describe('SearchProductController', () => {
  let controller: SearchProductController;
  let searchProductUsecase: SearchProductUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchProductController],
      providers: [
        {
          provide: SearchProductUsecase,
          useValue: {
            getProducts: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SearchProductController>(SearchProductController);
    searchProductUsecase =
      module.get<SearchProductUsecase>(SearchProductUsecase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call SearchProductUsecase.getProducts with the correct parameters', async () => {
    const query: ProductQueryDTO = { row_count: 2, row_skip: 1 };
    const mockProducts: ProductEntity[] = [
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: new Date('2023-07-01 00:00:00'),
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
    ];
    jest
      .spyOn(searchProductUsecase, 'getProducts')
      .mockResolvedValue(mockProducts);

    const result = await controller.searchProducts(query);

    expect(result).toBe(mockProducts);
    expect(searchProductUsecase.getProducts).toHaveBeenCalledWith(query);
  });
});
