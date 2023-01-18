import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const _request = context.switchToHttp().getRequest();
    return _request.isAuthenticated();
  }
}
