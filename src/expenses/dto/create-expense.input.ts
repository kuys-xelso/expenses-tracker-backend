import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateExpenseInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => Float)
  amount: number;
}
