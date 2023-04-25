import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { getFormatNumberDecimal } from 'src/common/format-number-decimal';
import { Product } from 'src/products/schemas/product.schema';
import { Purchase } from 'src/purchases/schemas/purchase.schema';

export type PurchaseLineDocument = PurchasesLine & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { getters: true, virtuals: false },
})
export class PurchasesLine {
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
  cost: mongoose.Schema.Types.Decimal128;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' })
  puchase: Purchase;
}

export const PurchaseLineSchema = SchemaFactory.createForClass(PurchasesLine);
