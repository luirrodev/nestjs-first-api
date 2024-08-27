import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateOrderProductDTO,
  UpdateOrderProductDto,
} from '../dtos/order-product.dto';
import { Order } from '../entities/order.entity';
import { OrderProduct } from 'src/products/entities/order-product.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(OrderProduct)
    private itemRepo: Repository<OrderProduct>,
  ) {}

  async create(data: CreateOrderProductDTO) {
    const order = await this.orderRepo.findOne({
      where: { id: data.orderId },
    });
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });
    const item = new OrderProduct();

    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    return this.itemRepo.save(item);
  }

  async update(id: number, changes: UpdateOrderProductDto) {
    const item = await this.itemRepo.findOne({ where: { id } });

    if (changes.orderId) {
      const order = await this.orderRepo.findOne({
        where: { id: changes.orderId },
      });
      item.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOne({
        where: { id: changes.productId },
      });
      item.product = product;
    }
    this.itemRepo.merge(item, changes);
    return this.itemRepo.save(item);
  }

  async remove(id: number) {
    return this.itemRepo.delete(id);
  }
}
