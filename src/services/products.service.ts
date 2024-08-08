import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/entities/product.entity';
@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Bla Bla Bla',
      price: 149.99,
      image: '',
      stock: 30,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id == id);
    if (!product) {
      throw new NotFoundException('Este producto no existe');
    }
    return product;
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

  update(id: number, payload: any) {
    const productToUpdate = this.findOne(id);
    if (productToUpdate !== undefined) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...productToUpdate,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => (item.id = id));
    if (index === -1) {
      throw new NotFoundException('Este producto no existe');
    }
    this.products.splice(index, 1);
    return true;
  }
}
