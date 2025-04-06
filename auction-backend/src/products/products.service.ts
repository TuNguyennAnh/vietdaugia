import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';

import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAll(category?: string): Promise<Product[]> {
    const filter = category ? { category } : {};
    return this.productModel.find(filter).exec();
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');
    return product;
  }

  async create(data: CreateProductDto, sellerId: string): Promise<Product> {
    let image = data.image;

    // ✅ Nếu là ảnh base64 thì lưu vào /uploads và lấy URL
    if (data.image?.startsWith('data:image')) {
      const matches = data.image.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) throw new BadRequestException('Ảnh không hợp lệ');
      const ext = matches[1];
      const base64Data = matches[2];
      const filename = `${uuidv4()}.${ext}`;
      const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    
      image = `/uploads/${filename}`; // ✅ đúng biến
    }

    const product = new this.productModel({
      ...data,
      image, // ✅ đúng biến
      seller: sellerId,
      currentPrice: data.startingPrice,
      endTime: data.endTime ? new Date(data.endTime) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    return product.save();
  }

  async updateBid(id: string, bid: number): Promise<Product> {
    const product = await this.getById(id);

    if (bid <= product.currentPrice) {
      throw new BadRequestException('Giá mới phải cao hơn giá hiện tại!');
    }

    const updated = await this.productModel.findByIdAndUpdate(
      id,
      { currentPrice: bid },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Không tìm thấy sản phẩm sau khi cập nhật');
    }

    return updated;
  }

  async delete(id: string, sellerId: string): Promise<{ message: string }> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại');

    if (product.seller?.toString() !== sellerId) {
      throw new ForbiddenException('Không thể xóa sản phẩm không thuộc về bạn');
    }

    await this.productModel.findByIdAndDelete(id);
    return { message: 'Đã xóa' };
  }
}
