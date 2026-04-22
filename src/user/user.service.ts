import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Returns the currently logged-in user's profile
  async me(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Allows the user to update their own name or avatar image
  async updateProfile(id: string, updateProfileInput: UpdateProfileInput) {
    return this.prisma.user.update({
      where: { id },
      data: updateProfileInput,
    });
  }
}
