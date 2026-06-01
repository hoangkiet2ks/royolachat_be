import { PrismaClient } from './src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const reqs = await prisma.friendship.findMany();
  console.log('FRIENDSHIPS:');
  console.log(JSON.stringify(reqs, null, 2));

  const users = await prisma.user.findMany({ select: { id: true, name: true, phoneNumber: true }});
  console.log('USERS:');
  console.log(JSON.stringify(users, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
