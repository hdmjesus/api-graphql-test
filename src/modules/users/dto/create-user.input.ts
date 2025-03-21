import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @MaxLength(30, {
    message: 'Title must be at most 30 characters long',
  })
  @MinLength(3, {
    message: 'Title must be at least 3 characters long',
  })
  @Field({ nullable: false })
  name?: string;
}
