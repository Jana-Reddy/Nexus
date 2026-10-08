import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: any) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new ConflictException('User already exists');

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // No hash needed for this mock
        name: data.name,
      },
    });

    return { access_token: Buffer.from(user.id).toString('base64'), user };
  }

  async login(data: any) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { access_token: Buffer.from(user.id).toString('base64'), user };
  }
}
