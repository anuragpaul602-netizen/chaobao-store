import { prisma } from "../lib/prisma";
import { products } from "./seed-data";

async function main() {
  console.log(`Seeding ${products.length} products...`);
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      create: p,
      update: p,
    });
  }
  const count = await prisma.product.count();
  console.log(`Done. ${count} rows in Product table.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
