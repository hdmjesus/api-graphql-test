import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../users/entities/user.entity';
import { Types } from 'mongoose';

@Schema()
@ObjectType()
export class Post {
  @Field(() => String)
  _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop()
  @Field({ nullable: true })
  content?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
