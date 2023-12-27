import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const statusCode = context
      .switchToHttp()
      .getResponse()
      .statusCode.toString();

    const success: boolean =
      statusCode.match(/^5\d\d$/) || statusCode.match(/^4\d\d$/) ? false : true;

    return next.handle().pipe(
      map((data) => ({
        statusCode: +statusCode,
        success,
        message: data?.message || '',
        data: {
          result: data?.result || [],
          meta: {}, // if this is supposed to be the actual return then replace {} with data.result
        },
      })),
    );
  }
}

// controller return as { message: 'Custom message', result }.
