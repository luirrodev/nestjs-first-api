import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get(':productID')
  getProduct(@Param() params: any) {
    return `product id => ${params.productID}`;
  }

  @Get()
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
}
