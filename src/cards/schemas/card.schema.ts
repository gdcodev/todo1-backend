import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type CardDocument = Card & Document;

@Schema({ timestamps: true, versionKey: false })
export class Card {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
  })
  numberHash: string;

  @Prop({
    type: Number,
  })
  lastFourNumbers: number;

  @Prop({
    type: String,
    required: true,
  })
  dueDate: string;

  @Prop({
    type: Number,
    required: true,
  })
  cvv: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CardSchema = SchemaFactory.createForClass(Card);
