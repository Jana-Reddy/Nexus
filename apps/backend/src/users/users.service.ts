import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async update(id: string, data: { name?: string }) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { name: data.name },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    return user;
  }
}
