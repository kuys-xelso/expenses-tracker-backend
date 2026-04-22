import { Injectable } from '@nestjs/common';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExpenseInput: CreateExpenseInput, userId: string) {
    return this.prisma.expenses.create({
      data: {
        userId,
        ...createExpenseInput,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.expenses.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.expenses.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(
    id: string,
    updateExpenseInput: UpdateExpenseInput,
    userId: string,
  ) {
    const expense = await this.prisma.expenses.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!expense) {
      throw new Error('Expense not found');
    }

    return this.prisma.expenses.update({
      where: {
        id,
      },
      data: updateExpenseInput,
    });
  }

  async remove(id: string, userId: string) {
    const expense = await this.prisma.expenses.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!expense) {
      throw new Error('Expense not found or you do not have this permission');
    }

    return this.prisma.expenses.delete({
      where: {
        id,
      },
    });
  }
}
