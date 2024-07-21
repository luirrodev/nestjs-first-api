import { Controller, Get, Param } from '@nestjs/common';
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
