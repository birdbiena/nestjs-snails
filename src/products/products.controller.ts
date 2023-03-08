import { CacheInterceptor, Controller, Get, Post, Render, UseInterceptors } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsCategories } from './model/products-categories.entity';
import * as _ from 'lodash';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('products')
  async index() {
    const productsCategories = await this.productsService.findCategoriesAll<ProductsCategories>({
      _locale: 'zh-hans',
    });

    return {
      title: 'PRODUCTS-CATEGORIES',
      data: this.productsService.sortdData(productsCategories, ['order'], ['asc']),
    };
  }

  /**
   * 获取Token的UI(定制一个安全的随机路由).
   */
  @Get('/get_token')
  @Render('token')
  async getTokenUI() {}

  /**
   * 获取Token的API
   */
  @Post('/get_token')
  async getToken() {}

  /**
   * 获取数据
   */
  @Get('/async')
  @UseInterceptors(CacheInterceptor)
  async asyncProducts() {
    const productsCategories = await this.productsService.findCategoriesAll<ProductsCategories>({
      _locale: 'zh-hans',
    });

    return this.productsService.sortdData(productsCategories, ['order'], ['asc']);
  }

  /**
   * 写数据库操作
   */
  @Post('/insert')
  createProducts() {}

  /**
   * 刷新redis操作
   */
  @Get('/refresh')
  async refresh() {}
}
