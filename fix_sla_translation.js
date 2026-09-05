const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const records = await prisma.translationCache.findMany({
      where: { original: "SLA" }
    });
    console.log("Records found for 'SLA':", records);
    
    for (const r of records) {
      await prisma.translationCache.update({
        where: { id: r.id },
        data: { ar: "اتفاقية مستوى الخدمة" }
      });
      console.log(`Updated translation for "${r.original}" to "اتفاقية مستوى الخدمة"`);
    }

    const records2 = await prisma.translationCache.findMany({
      where: { original: "3h SLA" }
    });
    for (const r of records2) {
      await prisma.translationCache.update({
        where: { id: r.id },
        data: { ar: "استجابة 3 ساعات" }
      });
      console.log(`Updated translation for "${r.original}" to "استجابة 3 ساعات"`);
    }

    const records3 = await prisma.translationCache.findMany({
      where: { original: "3h" }
    });
    for (const r of records3) {
      await prisma.translationCache.update({
        where: { id: r.id },
        data: { ar: "3 س" }
      });
      console.log(`Updated translation for "${r.original}" to "3 س"`);
    }

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
