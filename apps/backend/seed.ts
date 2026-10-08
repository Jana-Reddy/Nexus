import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with demo data...');

  // Create or update demo user
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      password: 'Password123',
      name: 'Test User',
    },
  });

  console.log(`Created/found user: ${user.email}`);

  // Create Projects
  const p1 = await prisma.project.create({
    data: {
      title: 'Website Redesign',
      description: 'Overhaul the company website to match the new brand guidelines.',
      status: 'IN_PROGRESS',
      startDate: new Date('2026-10-01'),
      endDate: new Date('2026-11-15'),
      ownerId: user.id,
    }
  });

  const p2 = await prisma.project.create({
    data: {
      title: 'Mobile App Launch',
      description: 'Prepare marketing and app store assets for the v1 release.',
      status: 'COMPLETED',
      startDate: new Date('2026-08-01'),
      endDate: new Date('2026-09-30'),
      ownerId: user.id,
    }
  });

  const p3 = await prisma.project.create({
    data: {
      title: 'Q4 Planning',
      description: 'Draft the product roadmap for Q4.',
      status: 'NOT_STARTED',
      startDate: new Date('2026-11-01'),
      endDate: new Date('2026-11-30'),
      ownerId: user.id,
    }
  });

  // Create Tasks for p1
  await prisma.task.createMany({
    data: [
      { title: 'Create wireframes', status: 'COMPLETED', priority: 'HIGH', projectId: p1.id, assigneeId: user.id },
      { title: 'Design home page', status: 'COMPLETED', priority: 'HIGH', projectId: p1.id, assigneeId: user.id },
      { title: 'Implement navigation', status: 'IN_PROGRESS', priority: 'MEDIUM', projectId: p1.id, assigneeId: user.id },
      { title: 'Write copy', status: 'PENDING', priority: 'MEDIUM', projectId: p1.id, assigneeId: user.id },
      { title: 'Setup analytics', status: 'PENDING', priority: 'LOW', projectId: p1.id, assigneeId: user.id },
    ]
  });

  // Create Tasks for p2
  await prisma.task.createMany({
    data: [
      { title: 'Submit to App Store', status: 'COMPLETED', priority: 'HIGH', projectId: p2.id, assigneeId: user.id },
      { title: 'Draft release notes', status: 'COMPLETED', priority: 'MEDIUM', projectId: p2.id, assigneeId: user.id },
      { title: 'Prepare ad creatives', status: 'COMPLETED', priority: 'MEDIUM', projectId: p2.id, assigneeId: user.id },
    ]
  });

  // Create Tasks for p3
  await prisma.task.createMany({
    data: [
      { title: 'Schedule kickoff meeting', status: 'PENDING', priority: 'HIGH', projectId: p3.id, assigneeId: user.id },
      { title: 'Review Q3 metrics', status: 'PENDING', priority: 'MEDIUM', projectId: p3.id, assigneeId: user.id },
    ]
  });

  console.log('Demo data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
