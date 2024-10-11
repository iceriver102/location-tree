import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard extends PassportGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  isPublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
  canActivate(context: ExecutionContext) {
    if (this.isPublic(context)) return true;
    return super.canActivate(context);
  }
}
