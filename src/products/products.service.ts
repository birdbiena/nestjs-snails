import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import { lastValueFrom, map } from 'rxjs';

import { plainToClass } from 'class-transformer';
import { HttpBaseService } from 'src/share/http-base';
import { Products } from './model/products.entity';
import { ProductsCategories } from './model/products-categories.entity';

import { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
  private RAINBOW_URL: string;
  private SECRET_KEY: any;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly httpService: HttpBaseService,
    private readonly configService: ConfigService
  ) {
    this.RAINBOW_URL = this.configService.get('RAINBOW_URL');
    this.SECRET_KEY = this.getToken({
      identifier: this.configService.get('RAINBOW_IDENTIFIER'),
      password: this.configService.get('RAINBOW_PASSWORD'),
    });
  }

  async findAll<T = any>(defaultParams: any) {
    const request = this.httpService
      .get<T>(`${this.RAINBOW_URL}/cloud-products`, {
        headers: {
          Authorization: `Bearer ${this.SECRET_KEY}`,
        },
        params: defaultParams,
      })
      .pipe(map((products: any) => plainToClass(Products, products)));

    return lastValueFrom(request);
  }

  async findCategoriesAll<T = any>(defaultParams: any): Promise<ProductsCategories> {
    let cacheData = await this.cacheManager.get<ProductsCategories>('PRODUCTS_CATEGORIES');
    if (cacheData) return cacheData;

    const request = this.httpService
      .get<T>(`${this.RAINBOW_URL}/cloud-product-categories`, {
        headers: {
          Authorization: `Bearer ${this.SECRET_KEY}`,
        },
        params: defaultParams,
      })
      .pipe(map((products: any) => plainToClass(ProductsCategories, products)));

    cacheData = await lastValueFrom(request);

    await this.cacheManager.set('PRODUCTS_CATEGORIES', cacheData, 1000 * 10);

    return cacheData;
  }

  /**
   * 获取数据Token
   * @returns Promise<string>
   */
  private async getToken(params: any): Promise<string> {
    let token = await this.cacheManager.get<string>('API_TOKEN');
    
    if (token) return this.SECRET_KEY = token;

    const request = this.httpService
      .post(`${this.RAINBOW_URL}/auth/local`, params)
      .pipe(map((data) => data.jwt));

    token = await lastValueFrom(request);

    await this.cacheManager.set('API_TOKEN', token, 1000 * 60 * 60 * 24);

    return this.SECRET_KEY = token;
  }

  sortdData(data: any, orderName: string[], orderBy): any[] {
    if (!data || data.length === 0) {
      throw new Error('数据为空!');
    }

    let _data = _.filter(data, ['hideInProductList', false]);
    _data = _.filter(_data, ['hidden', !true]);

    return _.orderBy(_data, [...orderName], [...orderBy]);
  }
}
