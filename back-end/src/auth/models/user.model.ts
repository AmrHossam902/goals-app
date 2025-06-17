
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true
})
export class User  {

  _id?: string; 

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop({ required: true, unique: true })
  password: string; 
  
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
