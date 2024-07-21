import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get(':productID')
  get(@Param() params: any) {
    return {
      message: `product id => ${params.productID}`,
    };
  }

  @Get('products_2/:productID')
  getProduct_2(@Param('productID') productID: number) {
    return {
      message: `product id => ${productID}`,
    };
  }

  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 10,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products(limit)  => ${limit} 
                products(offset) => ${offset} 
                products(brand)  => ${brand}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'accion para crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'accion para editar',
      productToUpdate: id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: 'accion para eliminar',
      productToDelete: id,
    };
  }
}
