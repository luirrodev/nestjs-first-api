import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductsService } from 'src/products/services/products.service';
import { ParseIntPipe } from 'src/shared/parse-int/parse-int.pipe';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product.dtos';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDTO) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
