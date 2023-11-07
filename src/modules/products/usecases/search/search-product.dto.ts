import { PartialType, PickType } from '@nestjs/swagger';
import { BaseQueryDTO } from '../../../../commons/dto/base-query.dto';

export class ProductQueryDTO extends PickType(PartialType(BaseQueryDTO), [
  'row_count',
  'row_skip',
]) {}
