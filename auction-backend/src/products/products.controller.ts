import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';
import { RequireRole } from '../auth/roles.decorator';
import { CreateProductDto } from '../dto/create-product.dto';
import { BidDto } from '../dto/bid.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query('category') category?: string): Promise<Product[]> {
    return this.productsService.getAll(category);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @RequireRole('seller','admin')
  @Post()
  async create(
    @Body() body: CreateProductDto,
    @Request() req,
  ): Promise<Product> {
    const sellerId = req.user.sub;
    return this.productsService.create(body, sellerId);
  }

  @Patch(':id/bid')
  async bid(
    @Param('id') id: string,
    @Body() body: BidDto,
  ): Promise<{ message: string; product: Product }> {
    const product = await this.productsService.updateBid(id, body.bid);
    return {
      message: 'Đặt giá thành công',
      product,
    };
  }

  @RequireRole('seller','admin')
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.productsService.delete(id, req.user.sub);
  }
}
