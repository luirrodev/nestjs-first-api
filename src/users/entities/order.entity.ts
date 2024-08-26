import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Customer } from './customer.entity';
import { OrderProduct } from 'src/products/entities/order-product.entity';

@Entity({
  name: 'orders',
})
export class Order {
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

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  products: OrderProduct[];
}
