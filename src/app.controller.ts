import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'Yo soy un nuevo Endpoint';
  }

  @Get('products/:productID')
  getProduct(@Param() params: any) {
    return `product id => ${params.productID}`;
  }

  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 10,
    @Query('brand') brand: string,
  ) {
    return `products(limit)  => ${limit} 
            products(offset) => ${offset} 
            products(brand)  => ${brand}`;
  }

  @Get('products_2/:productID')
  getProduct_2(@Param('productID') productID: number) {
    return `product id => ${productID}`;
  }

  @Get('categories/:id/products/:productID')
  getCategories(
    @Param('productID') productID: number,
    @Param('id') id: number,
  ) {
    return `product id => ${productID} y la categoria => ${id}`;
  }
}
