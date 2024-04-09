import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ unique: true, required: true })
  payNo: string;

  @Prop({ default: new Date() })
  transactionDate: Date;

  @Prop({ default: '' })
  openingBalance: string;

  @Prop({ default: null })
  name: string;

  @Prop({ default: '' })
  payType: string;

  @Prop({ default: null })
  debitAmount: string;

  @Prop({ default: null })
  creditAmount: string;

  @Prop({ default: '' })
  payBy: string;

  @Prop({ default: '' })
  payNote: string;

  @Prop({ default: '' })
  note: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

const PaymentSchema = SchemaFactory.createForClass(Payment);

export { PaymentSchema };
