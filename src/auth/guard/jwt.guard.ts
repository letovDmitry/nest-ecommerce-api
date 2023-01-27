import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport'
import { shouldBypassAuth } from '../decorator/bypassAuth.decorator';

export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
      }
    
      canActivate(context: ExecutionContext) {
        return (
          shouldBypassAuth(context)
          || super.canActivate(context)
        );
      }
}