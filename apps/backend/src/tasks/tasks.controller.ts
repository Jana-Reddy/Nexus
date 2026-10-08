import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  findAll(@Query('projectId') projectId?: string) {
    if (projectId) {
      return this.prisma.task.findMany({ where: { projectId } });
    }
    return this.prisma.task.findMany();
  }

  @Post()
  create(@Body() body: any) {
    return this.prisma.task.create({
      data: {
        title: body.title,
        projectId: body.projectId,
        status: body.status || 'PENDING',
        priority: body.priority || 'MEDIUM',
      }
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.prisma.task.update({
      where: { id },
      data: { status: body.status }
    });
  }
}
