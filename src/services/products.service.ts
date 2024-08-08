import { Injectable } from '@nestjs/common';

import { Product } from 'src/entities/product.entity';
@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'blablabla',
      price: 149.99,
      image: '',
      stock: 30,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(payload: any, id: number) {
    const productToUpdate = this.findOne(id);
    productToUpdate = payload;
  }
}
