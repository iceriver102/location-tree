import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

interface ClassConstructor {
  new(...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) { }

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    return handler.handle().pipe(
      map((data: any) => {
        return {
          data: plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          }),
          message: "success",
          statusCode: response.statusCode
        };
      }),
    );
  }
}
