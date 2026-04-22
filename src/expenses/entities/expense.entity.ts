import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Expense {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
