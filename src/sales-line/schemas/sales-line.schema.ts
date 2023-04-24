import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { getFormatNumberDecimal } from 'src/common/format-number-decimal';
import { Product } from 'src/products/schemas/product.schema';
import { Sale } from 'src/sales/schemas/sale.schema';

export type SalesLineDocument = SalesLine & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { getters: true, virtuals: false },
})
export class SalesLine {
  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;

  @Prop({
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: getFormatNumberDecimal,
  })
  subtotal: mongoose.Schema.Types.Decimal128;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' })
  sale: Sale;
}

export const SalesLineSchema = SchemaFactory.createForClass(SalesLine);
