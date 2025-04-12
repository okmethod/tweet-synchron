export function removeAsteriskNumber(entry: string): string {
  /**
   * エントリから *数字 を削除する
   */
  return entry.replace(/\*\d+/g, "").trim();
}

export function isEnclosedInBrackets(entry: string): boolean {
  /**
   * エントリが《》で囲まれているかを判定する
   */
  return /^《.*》$/.test(entry);
}

export function fetchEnclosingBrackets(entry: string, includeBrackets?: boolean | undefined): string {
  /**
   * エントリの《》で囲まれた部分のみを取得する
   */
  const match = entry.match(/《(.*?)》/);
  if (!match) return "";

  return includeBrackets ? match[0] : match[1];
}
