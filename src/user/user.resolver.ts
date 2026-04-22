import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Session } from '@thallesp/nestjs-better-auth';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Returns the currently authenticated user's profile
  @Query(() => User, { name: 'me' })
  me(@Session() session: any) {
    return this.userService.me(session.user.id);
  }

  // Allows the user to update their own name or avatar
  @Mutation(() => User)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @Session() session: any,
  ) {
    return this.userService.updateProfile(session.user.id, updateProfileInput);
  }
}
