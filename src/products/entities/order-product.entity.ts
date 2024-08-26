import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

import { Order } from 'src/users/entities/order.entity';
import { Product } from './product.entity';

@Entity({
  name: 'orders_products',
})
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
