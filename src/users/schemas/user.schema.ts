import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
	@Prop({required: true})
  email: string;

	@Prop()
  password: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Address'})
  address: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
  wishlist: mongoose.Schema.Types.ObjectId;

  @Prop({default: false})
  isBlocked: boolean;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Role'})
  role: mongoose.Schema.Types.ObjectId;

  @Prop()
  refreshToken: string;

	@Prop()
  phone: string;

  @Prop({default: 'local'})
  typeLogin: string;

  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  cart: string[];

  @Prop()
  passwordChangeAt: string;

  @Prop()
  passwordResetToken: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop({type:Object})
  createdBy:{
    _id:mongoose.Schema.Types.ObjectId,
    email:string
  };

  @Prop({type:Object})
  updatedBy:{
    _id:mongoose.Schema.Types.ObjectId,
    email:string
  };

  @Prop({type:Object})
  deletedBy:{
    _id:mongoose.Schema.Types.ObjectId,
    email:string
  };

  @Prop()
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);