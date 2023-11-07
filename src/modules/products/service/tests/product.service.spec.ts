import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from '../../entity/product.entity';
import { Repository, EntityManager } from 'typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let productRepositoryMock: Partial<Repository<ProductEntity>>;
  let entityManagerMock: Partial<EntityManager>;

  beforeEach(async () => {
    productRepositoryMock = {
      findOne: jest.fn().mockResolvedValue(new ProductEntity()),
      find: jest.fn().mockResolvedValue([new ProductEntity()]),
      create: jest.fn().mockImplementation((dto) => dto),
    };

    entityManagerMock = {
      transaction: jest.fn().mockImplementation(async (transactionBody) => {
        return transactionBody({
          save: jest
            .fn()
            .mockImplementation((entities) => Promise.resolve(entities)),
        });
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: productRepositoryMock,
        },
        {
          provide: EntityManager,
          useValue: entityManagerMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should return a product by key', async () => {
    const key = 'some-key';
    const product = await service.getProductByKey(key);
    expect(product).toBeInstanceOf(ProductEntity);
    expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
      where: { key },
    });
  });
});
