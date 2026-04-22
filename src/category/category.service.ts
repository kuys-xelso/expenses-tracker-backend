import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput, userId: string) {
    return this.prisma.category.create({
      data: {
        userId,
        ...createCategoryInput,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.category.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
    userId: string,
  ) {
    const category = await this.prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new Error(
        'Category not found or you do not have permission to update it',
      );
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryInput,
    });
  }

  async remove(id: string, userId: string) {
    const category = await this.prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new Error(
        'Category not found or you do not have permission to remove it',
      );
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
