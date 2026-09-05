import prisma from "./prisma";

/**
 * Batch-load SiteContent keys from the database.
 * Returns a Record<key, value> for the requested keys.
 * Missing keys return an empty string.
 */
export async function getSiteContent(
  keys: string[]
): Promise<Record<string, string>> {
  const records = await prisma.siteContent.findMany({
    where: { key: { in: keys } },
  });

  const map: Record<string, string> = {};
  for (const r of records) {
    map[r.key] = r.value;
  }
  // Ensure all requested keys exist (empty string if missing)
  for (const k of keys) {
    if (!(k in map)) map[k] = "";
  }
  return map;
}
