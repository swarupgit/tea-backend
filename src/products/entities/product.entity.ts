import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  part_no: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  unit: string;

  @Prop({ default: null })
  location: string;

  @Prop({ default: null })
  category: string;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export { ProductSchema };
