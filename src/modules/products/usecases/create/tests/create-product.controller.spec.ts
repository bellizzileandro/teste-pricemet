import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductController } from '../create-product.controller';
import { CreateProductUsecase } from '../create-product.usecase';
import { BaseProductDTO } from '../../../dto/base-product.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CreateProductController', () => {
  let controller: CreateProductController;
  let createProductUsecase: CreateProductUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateProductController],
      providers: [
        {
          provide: CreateProductUsecase,
          useValue: {
            bulkCreate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateProductController>(CreateProductController);
    createProductUsecase =
      module.get<CreateProductUsecase>(CreateProductUsecase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should return a successful creation message', async () => {
      const dto: BaseProductDTO[] = [
        // preencha com dados de exemplo válidos
      ];
      const responseMessage = 'Products successfully created.';

      jest
        .spyOn(createProductUsecase, 'bulkCreate')
        .mockResolvedValue(responseMessage);

      expect(await controller.createProduct(dto)).toBe(responseMessage);
    });

    it('should throw a BadRequestException when input data is invalid', async () => {
      const dto: BaseProductDTO[] = [
        // preencha com dados de exemplo inválidos
      ];
      const errorMessage = 'Invalid input data';

      jest
        .spyOn(createProductUsecase, 'bulkCreate')
        .mockRejectedValue(
          new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
        );

      await expect(controller.createProduct(dto)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
