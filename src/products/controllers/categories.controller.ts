import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:productID')
  getCategories(
    @Param('productID') productID: number,
    @Param('id') id: number,
  ) {
    return `product id => ${productID} y la categoria => ${id}`;
  }
}
