const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const reqs = await prisma.friendship.findMany();
  console.log('FRIENDSHIPS:');
  console.log(JSON.stringify(reqs, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
