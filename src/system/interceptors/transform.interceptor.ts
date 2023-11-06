import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const formatResponse = (data: any) => {
  if (
    Object.keys(data).includes('row_count') &&
    Object.keys(data).includes('row_skip')
  )
    return {
      row_skip: data.row_skip,
      row_count: data.row_count,
      data: data.data,
    };

  return { data: data };
};

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return data ? formatResponse(data) : undefined;
      }),
    );
  }
}
