import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startingPrice: number;

  @Prop({ required: true })
  currentPrice: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // 👈 Thêm dòng này
  seller: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
