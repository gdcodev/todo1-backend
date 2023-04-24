import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, versionKey: false })
export class Category {
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
}

export const CategorySchema = SchemaFactory.createForClass(Category);
