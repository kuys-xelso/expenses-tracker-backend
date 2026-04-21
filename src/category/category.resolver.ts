import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Session } from '@thallesp/nestjs-better-auth';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Session() session: any,
  ) {
    return this.categoryService.create(createCategoryInput, session.user.id);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(@Session() session: any) {
    return this.categoryService.findAll(session.user.id);
  }

  @Query(() => Category, { name: 'category' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ) {
    return this.categoryService.findOne(id, session.user.id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @Session() session: any,
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
      session.user.id,
    );
  }

  @Mutation(() => Category)
  removeCategory(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ) {
    return this.categoryService.remove(id, session.user.id);
  }
}
