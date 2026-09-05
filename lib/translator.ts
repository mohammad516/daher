export async function translateText(text: string): Promise<string> {
  if (!text || text.trim() === "") return text;

  try {
    return await translateGoogle(text);
  } catch (err1) {
    console.error("Google Translate failed:", err1);
    try {
      return await translateMyMemory(text);
    } catch (err2) {
      console.error("MyMemory Translate failed:", err2);
      try {
        return await translateLingva(text);
      } catch (err3) {
        console.error("Lingva Translate failed:", err3);
        // If all fail, return the original text
        return text;
      }
    }
  }
}

async function translateGoogle(text: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Google Translate HTTP error " + res.status);
  
  const data = await res.json();
  // Google returns an array of arrays where the first element is the translated parts
  let translatedText = "";
  if (data && data[0]) {
    for (const part of data[0]) {
      if (part[0]) translatedText += part[0];
    }
  }
  
  if (!translatedText) throw new Error("Empty translation from Google");
  return translatedText;
}

async function translateMyMemory(text: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("MyMemory HTTP error " + res.status);
  
  const data = await res.json();
  if (data.responseData?.translatedText) {
    return data.responseData.translatedText;
  }
  throw new Error("Empty translation from MyMemory");
}

async function translateLingva(text: string): Promise<string> {
  const url = `https://lingva.ml/api/v1/en/ar/${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Lingva HTTP error " + res.status);
  
  const data = await res.json();
  if (data.translation) {
    return data.translation;
  }
  throw new Error("Empty translation from Lingva");
}
