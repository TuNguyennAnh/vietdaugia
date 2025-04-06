import {
  Controller,
  Get,
  Post,
  Patch,
  Delete, // ✅ bổ sung
  Body,
  Param,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';
import { RequireRole } from '../auth/roles.decorator';

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

  @RequireRole('seller')
  @Post()
  async create(@Body() body, @Request() req) {
    const sellerId = req.user.sub;
    return this.productsService.create(body, sellerId);
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

  @RequireRole('seller')
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.productsService.delete(id, req.user.sub);
  }
}
