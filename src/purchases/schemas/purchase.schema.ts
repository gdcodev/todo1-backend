import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { getFormatNumberDecimal } from 'src/common/format-number-decimal';
import { User } from 'src/users/schemas/user.schema';

export type PurchaseDocument = Purchase & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { getters: true, virtuals: false },
})
export class Purchase {
  @Prop({
    type: Date,
    default: new Date(),
  })
  date: Date;

  @Prop({
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: getFormatNumberDecimal,
  })
  total: mongoose.Schema.Types.Decimal128;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
