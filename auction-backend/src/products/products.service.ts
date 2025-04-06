import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');
    return product;
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const created = new this.productModel(productData);
    return created.save();
  }

  async updateBid(id: string, bid: number): Promise<Product> {
    const product = await this.getById(id);
    if (bid <= product.currentPrice) {
      throw new Error('Giá mới phải cao hơn giá hiện tại!');
    }
  
    const updated = await this.productModel.findByIdAndUpdate(
      id,
      { currentPrice: bid },
      { new: true }
    );
  
    if (!updated) {
      throw new NotFoundException('Không tìm thấy sản phẩm sau khi cập nhật');
    }
  
    return updated;
  }
  
}
