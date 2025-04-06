import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    NotFoundException,
  } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { Product } from './product.schema';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Get()
    async getAll(): Promise<Product[]> {
      return this.productsService.getAll();
    }
  
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Product> {
      return this.productsService.getById(id);
    }
  
    @Post()
    async create(@Body() body: Partial<Product>): Promise<Product> {
      return this.productsService.create(body);
    }
  
    @Patch(':id/bid')
    async bid(
      @Param('id') id: string,
      @Body('bid') bid: number,
    ): Promise<{ message: string; product: Product }> {
      const product = await this.productsService.updateBid(id, bid);
      return {
        message: 'Đặt giá thành công',
        product,
      };
    }
  }
  