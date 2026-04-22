import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { Session } from '@thallesp/nestjs-better-auth';

@Resolver(() => Expense)
export class ExpensesResolver {
  constructor(private readonly expensesService: ExpensesService) {}

  @Mutation(() => Expense)
  createExpense(
    @Args('createExpenseInput') createExpenseInput: CreateExpenseInput,
    @Session() session: any,
  ) {
    return this.expensesService.create(createExpenseInput, session.user.id);
  }

  @Query(() => [Expense], { name: 'expenses' })
  findAll(@Session() session: any) {
    return this.expensesService.findAll(session.user.id);
  }

  @Query(() => Expense, { name: 'expense' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ) {
    return this.expensesService.findOne(id, session.user.id);
  }

  @Mutation(() => Expense)
  updateExpense(
    @Args('updateExpenseInput') updateExpenseInput: UpdateExpenseInput,
    @Session() session: any,
  ) {
    return this.expensesService.update(
      updateExpenseInput.id,
      updateExpenseInput,
      session.user.id,
    );
  }

  @Mutation(() => Expense)
  removeExpense(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ) {
    return this.expensesService.remove(id, session.user.id);
  }
}
