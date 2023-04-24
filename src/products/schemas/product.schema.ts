import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { getFormatNumberDecimal } from 'src/common/format-number-decimal';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { getters: true, virtuals: false },
})
export class Product {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: getFormatNumberDecimal,
  })
  price: mongoose.Schema.Types.Decimal128;

  @Prop({
    type: Number,
    required: true,
  })
  stock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
