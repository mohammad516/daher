import prisma from "./prisma";
import { translateText } from "./translator";
import crypto from "crypto";

// Helper to hash strings for faster DB lookups
function hashString(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function getTranslatedText(englishText: string): Promise<string> {
  if (!englishText || typeof englishText !== "string" || englishText.trim() === "") return englishText;

  const key = hashString(englishText);

  // Check DB cache first
  const cached = await prisma.translationCache.findUnique({
    where: { key }
  });

  if (cached) {
    return cached.ar;
  }

  // If not in cache, fetch translation from API
  try {
    const arText = await translateText(englishText);
    
    // Save to cache
    await prisma.translationCache.create({
      data: {
        key,
        original: englishText,
        ar: arText
      }
    });

    return arText;
  } catch (err) {
    console.error("Translation API failed entirely, falling back to English.", err);
    return englishText;
  }
}

// Helper to translate an entire object or array recursively
export async function translateDeep(data: any): Promise<any> {
  if (data === null || data === undefined) return data;

  if (typeof data === "string") {
    // Only translate if it's not a URL or very short token
    if (data.startsWith("http") || data.startsWith("/") || data.length < 2) {
      return data;
    }
    return await getTranslatedText(data);
  }

  if (Array.isArray(data)) {
    return await Promise.all(data.map(item => translateDeep(item)));
  }

  if (typeof data === "object") {
    const translatedObj: any = {};
    const keys = Object.keys(data);
    
    // Process sequentially or in parallel? Parallel is faster but might hit rate limits.
    // We'll do a simple parallel map.
    await Promise.all(
      keys.map(async (k) => {
        // Skip translating IDs, keys, image URLs, categories
        if (["id", "key", "image", "logo", "category", "slug", "url", "href"].includes(k)) {
          translatedObj[k] = data[k];
        } else {
          translatedObj[k] = await translateDeep(data[k]);
        }
      })
    );
    return translatedObj;
  }

  return data;
}
