import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';

@Schema({
  timestamps: true,
})
export class Quotation extends Document {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Customer.name,
    required: true,
  })
  customerId: string;

  @Prop({ required: true })
  customerMobileNo: string;

  @Prop({ required: true })
  vehicleNo: string;

  @Prop({ required: true, default: null })
  quotation: string;

  @Prop({ default: 0 })
  finalAmount: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

const QuotationSchema = SchemaFactory.createForClass(Quotation);

QuotationSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'customerId',
    select: {
      vehicleNo: true,
      name: true,
      mobileNo: true,
      address: true,
      email: true,
    },
  });
  next();
});

export { QuotationSchema };
