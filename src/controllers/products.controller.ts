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

import { ProductsService } from 'src/services/products.service';
import { ParseIntPipe } from 'src/shared/parse-int/parse-int.pipe';

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
  create(@Body() payload: any) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
