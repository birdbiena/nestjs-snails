import { CacheInterceptor, CACHE_KEY_METADATA, ExecutionContext } from "@nestjs/common";

export class HttpCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string | undefined {
    const cacheKey = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler()
    );

    if (cacheKey) {
      const request = context.switchToHttp().getRequest();
      return `${cacheKey}-${request._parsUrl.query}`;
    }

    return super.trackBy(context);
  }
}