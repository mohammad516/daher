const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  try {
    const translations = await prisma.translationCache.findMany();
    
    let md = "# Translation Cache Review\n\n";
    md += "| Original (English) | Arabic Translation |\n";
    md += "|---|---|\n";
    
    for (const t of translations) {
      // Escape pipe characters for markdown table
      const eng = t.original.replace(/\|/g, '\\|').replace(/\n/g, ' ');
      const ar = t.ar.replace(/\|/g, '\\|').replace(/\n/g, ' ');
      md += `| ${eng} | ${ar} |\n`;
    }
    
    fs.writeFileSync('translations_review.md', md);
    console.log("Successfully dumped translations to translations_review.md");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
