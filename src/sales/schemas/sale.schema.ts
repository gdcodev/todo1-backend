import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Card } from 'src/cards/schemas/card.schema';
import { getFormatNumberDecimal } from 'src/common/format-number-decimal';
import { PaymentMethod } from 'src/common/payment-method.enum';
import { User } from 'src/users/schemas/user.schema';

export type SaleDocument = Sale & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { getters: true } })
export class Sale {
  @Prop({
    type: Date,
    default: new Date(),
  })
  date: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    get: getFormatNumberDecimal,
  })
  total: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    enum: [PaymentMethod.Cash, PaymentMethod.Card],
    required: true,
  })
  paymentMethod: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card' })
  card: Card;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
