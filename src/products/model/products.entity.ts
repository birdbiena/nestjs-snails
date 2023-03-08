import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Exclude()
@Entity('products')
export class Products {
  @Expose()
  @PrimaryColumn()
  id: number;

  @Expose()
  @Column()
  name: string;

  @Column()
  icon: string;

  @Expose()
  @Column()
  description: string;

  @Expose()
  @Column()
  order: number;

  @Expose()
  @Column()
  featured: boolean;

  @Expose()
  @Column()
  category: number;

  @Expose()
  @Column()
  locale: string;

  @Expose()
  @Column({ name: 'project_code' })
  projectCode: string;

  @Expose()
  @Column()
  code: string;

  @Expose()
  @Column()
  hidden: boolean;
}
