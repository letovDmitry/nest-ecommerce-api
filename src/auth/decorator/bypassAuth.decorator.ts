import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const BYPASS_KEY = 'bypass';

export const BypassAuth = () => {
  return SetMetadata(BYPASS_KEY, true);
};

export const shouldBypassAuth = (
    context: ExecutionContext,
  ): boolean => {
    const reflector  = new Reflector()
    return reflector.get(BYPASS_KEY, context.getHandler());
  };