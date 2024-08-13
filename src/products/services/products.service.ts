import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dtos';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException('Este producto no existe');
    }
    return product;
  }

  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandService.findOne(data.brandId);
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const productToUpdate = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandService.findOne(changes.brandId);
      productToUpdate.brand = brand;
    }
    this.productRepo.merge(productToUpdate, changes);
    return this.productRepo.save(productToUpdate);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.productRepo.delete(id);
  }
}
