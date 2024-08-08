import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dtos';

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

  create(payload: CreateProductDTO) {
    console.log(payload);

    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDTO) {
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
