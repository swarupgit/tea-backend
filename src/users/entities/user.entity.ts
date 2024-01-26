import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ default: true })
  active: boolean;

  @Prop({ required: true, default: null })
  name: string;

  @Prop({ lowercase: true, default: null })
  email: string;

  @Prop({ required: true, minlength: 8, select: false })
  password: string;

  @Prop({ default: null })
  address: string;

  @Prop({ default: false })
  is_loggedin: boolean;

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ required: true, default: 'sales' })
  role: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre(/^find/, function (next) {
  this.find().select({ __v: false, createdAt: false, updatedAt: false });

  next();
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 9);
  next();
});

export { UserSchema };
