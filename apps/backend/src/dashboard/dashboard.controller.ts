import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getDashboard() {
    // Return real statistics using Prisma
    const [
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressProjects,
      recentTasks,
      projectsOverview
    ] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.task.count(),
      this.prisma.task.count({ where: { status: 'COMPLETED' } }),
      this.prisma.task.count({ where: { status: 'PENDING' } }),
      this.prisma.project.count({ where: { status: 'IN_PROGRESS' } }),
      this.prisma.task.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
      this.prisma.project.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
    ]);

    return {
      stats: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressProjects
      },
      recentTasks,
      projectsOverview
    };
  }
}
