import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ unique: true, required: true })
  invoiceNo: string;

  @Prop({ default: null })
  type: string;

  @Prop({ default: null })
  vchNo: string;

  @Prop({ default: null })
  clNo: string;

  @Prop({ default: null })
  netLeafKgs: string;

  @Prop({ default: null })
  qlty: string;

  @Prop({ default: null })
  rateKg: string;

  @Prop({ default: null })
  debitAmount: string;

  @Prop({ default: null })
  creditAmount: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Customer.name,
    required: true,
  })
  customerId: string;

  @Prop({ default: null })
  note: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: new Date() })
  transactionDate: Date;
}

const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'customerId',
    select: {
      name: true,
      mobile: true,
      address: true,
      email: true,
    },
  });
  next();
});

export { OrderSchema };
