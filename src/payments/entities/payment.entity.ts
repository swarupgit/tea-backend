import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ unique: true, required: true })
  payNo: string;

  @Prop({ default: new Date() })
  transactionDate: Date;

  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  payType: string;

  @Prop({ default: null })
  debitAmount: string;

  @Prop({ default: null })
  creditAmount: string;

  @Prop({ default: null })
  payBy: string;

  @Prop({ default: null })
  note: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

const PaymentSchema = SchemaFactory.createForClass(Payment);

export { PaymentSchema };
