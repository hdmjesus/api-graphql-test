import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from 'src/modules/post/post.entity';

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  @Field(() => [Post], { nullable: true })
  posts: Post[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
