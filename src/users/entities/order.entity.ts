import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

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

  @Exclude()
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  products: OrderProduct[];

  @Expose()
  get items() {
    if (this.products) {
      return this.products
        .filter((product) => !!product)
        .map((product) => ({
          ...product.product,
          quantity: product.quantity,
          itemId: product.id,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.products) {
      return this.products
        .filter((product) => !!product)
        .reduce((total, item) => {
          const totalProduct = item.product.price * item.quantity;
          return total + totalProduct;
        }, 0);
    }
    return 0;
  }
}
