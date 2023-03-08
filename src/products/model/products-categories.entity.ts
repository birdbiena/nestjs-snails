import { Exclude, Expose, Type } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Products } from './products.entity';

@Exclude()
@Entity('products_categories')
export class ProductsCategories {
  @Expose()
  @PrimaryColumn()
  id: number;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column()
  order: number;

  @Expose()
  @Column()
  locale: string;

  @Expose()
  @Column()
  hidden: boolean;

  @Expose()
  hideInProductList: boolean;

  @Expose()
  @Type(() => Products)
  products: Products[];
}
