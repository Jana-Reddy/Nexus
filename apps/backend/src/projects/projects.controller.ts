import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.project.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  @Post()
  create(@Body() body: any) {
    return this.prisma.project.create({
      data: {
        title: body.title,
        description: body.description || '',
        status: body.status || 'NOT_STARTED',
        owner: { connect: { email: 'test@test.com' } } // Mock owner connection for now
      }
    });
  }
}
