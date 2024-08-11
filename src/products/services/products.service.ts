import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException('Este producto no existe');
    }
    return product;
  }

  create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const productToUpdate = await this.productRepo.findOne(id);
    this.productRepo.merge(productToUpdate, changes);
    return this.productRepo.save(productToUpdate);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.productRepo.delete(id);
  }
}
