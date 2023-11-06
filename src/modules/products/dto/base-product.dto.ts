import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsUUID,
  IsDateString,
  IsInt,
  IsString,
  Min,
  IsOptional,
  IsNumber,
  Matches,
  IsPositive,
  IsDecimal,
} from 'class-validator';

export class BaseProductDTO {
  @ApiProperty({
    description: 'The unique identifier for the product',
    format: 'uuid',
  })
  @IsUUID(4)
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'The unique identifier for the product',
    format: 'uuid',
  })
  @IsUUID(4)
  key: string;

  @ApiProperty({
    description: 'The date when the price was set',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  data_preco: string;

  @ApiProperty({
    description: 'The product code',
    type: String,
  })
  @IsNumber()
  @IsPositive()
  cod_produto: number;

  @ApiProperty({
    description: 'The stock keeping unit',
    type: String,
  })
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'The quantity in stock',
    type: Number,
    minimum: 0.0,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0.0)
  qtd_estoque: number;

  @ApiProperty({
    description: 'The discount amount',
    type: Number,
    minimum: 0.0,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0.0)
  desconto: number;

  @ApiProperty({
    description: 'The timestamp of when the product was inserted',
    type: Date,
    format: 'date-time',
  })
  @IsDateString()
  data_hora_insercao: Date;

  @ApiProperty({
    description: 'The start date for the product',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'data_inicio must be in the format YYYY-MM-DD',
  })
  data_inicio: string;

  @ApiPropertyOptional({
    description: 'The end date for the product',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'data_fim must be in the format YYYY-MM-DD',
  })
  data_fim?: string;
}
