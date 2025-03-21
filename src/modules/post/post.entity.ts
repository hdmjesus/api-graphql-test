import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Post {
  @Prop({ index: true })
  @Field(() => String)
  _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop()
  @Field({ nullable: true })
  content?: string;
}
export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
