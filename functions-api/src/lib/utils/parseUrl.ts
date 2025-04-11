import iconv from "iconv-lite";

export function encodeEucJp(query: string): string {
  // euc-jpでエンコード
  const encodedBuffer = iconv.encode(query, "euc-jp");

  // URLエンコード
  return Array.from(encodedBuffer)
    .map((byte) => `%${byte.toString(16).toUpperCase().padStart(2, "0")}`)
    .join("");
}
