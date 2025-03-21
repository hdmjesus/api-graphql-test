import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @MaxLength(30, {
    message: 'Title must be at most 30 characters long',
  })
  @MinLength(3, {
    message: 'Title must be at least 3 characters long',
  })
  @IsNotEmpty()
  @Field()
  title!: string;

  @MaxLength(200)
  @Field({ nullable: true })
  content?: string;
}
