import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserObj = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
