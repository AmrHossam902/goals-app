// schemas/goal.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type GoalDocument = HydratedDocument<Goal>;

@Schema()
export class Goal {

  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  deadline: Date;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop()
  publicId?: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' })
  parentId?: mongoose.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Goal' })
  childGoals?: Goal[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: mongoose.Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);