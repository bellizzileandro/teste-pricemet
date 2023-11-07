import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUsecase } from '../create-product.usecase';
import { ProductEntity } from '../../../entity/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { BaseProductDTO } from '@/modules/products/dto/base-product.dto';
import { ConfigService } from '@nestjs/config';

describe('CreateProductUsecase', () => {
  let usecase: CreateProductUsecase;
  let productRepository: Repository<ProductEntity>;

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      save: jest.fn(),
    },
  };

  const mockRepository = {
    manager: {
      connection: {
        createQueryRunner: jest.fn(() => mockQueryRunner),
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUsecase,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockRepository,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'BATCH_SIZE') {
                return 10; // Mocked batch size
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    usecase = module.get<CreateProductUsecase>(CreateProductUsecase);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should successfully insert products', async () => {
    const testData: BaseProductDTO[] = [
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: '2023-07-01 00:00:00',
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
        data_hora_insercao: '2023-07-01 00:00:00',
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
        data_hora_insercao: '2023-07-01 00:00:00',
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
    ];

    const totalProducts = testData.length;

    jest.spyOn(mockQueryRunner.manager, 'save').mockResolvedValue(undefined);

    const result = await usecase.bulkCreate(testData);

    expect(result).toEqual(`${totalProducts} items registered.`);
    expect(
      productRepository.manager.connection.createQueryRunner()
        .commitTransaction,
    ).toHaveBeenCalled();
  });

  it('should throw error if insert fails', async () => {
    const testData = [
      {
        key: 'fa494ffb-0af7-4bee-985c-556e5e90721f',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: '01/07/2023',
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
      {
        key: '5',
        data_preco: '2023-08-01',
        cod_produto: 9999999999999,
        sku: 'PZ0912',
        qtd_estoque: 10,
        desconto: 0,
        data_hora_insercao: '2023-07-01 00:00:00',
        data_inicio: '2023-07-01',
        data_fim: '2023-07-31',
      },
    ];

    jest
      .spyOn(mockQueryRunner.manager, 'save')
      .mockRejectedValue(new BadRequestException('Insert failed'));

    await expect(usecase.bulkCreate(testData)).rejects.toThrow(
      BadRequestException,
    );
    expect(
      productRepository.manager.connection.createQueryRunner()
        .rollbackTransaction,
    ).toHaveBeenCalled();
  });
});
