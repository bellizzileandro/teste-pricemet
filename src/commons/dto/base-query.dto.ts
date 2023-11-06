import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class BaseQueryDTO {
  @ApiProperty({
    description:
      "The number of rows will be returned. If row_count is equal to -1, all lines will be returned. We, strongly, recommend don't pass -1 in this parameter.",
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(-1)
  @Max(100)
  row_count?: number;

  @ApiProperty({
    description: 'The number of rows will be ignored.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  row_skip?: number;
}
