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
