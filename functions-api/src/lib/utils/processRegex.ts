import type { CardNames } from "../types/ygowiki";

export function removeAsteriskNumber(entry: string): string {
  /**
   * エントリから *数字 を削除する
   */
  return entry.replace(/\*\d+/g, "").trim();
}

export function isEnclosedInAngleBrackets(entry: string): boolean {
  /**
   * エントリが《》で囲まれているかを判定する
   */
  return /^《.*》$/.test(entry);
}

export function fetchEnclosingAngleBrackets(entry: string, includeBrackets?: boolean | undefined): string {
  /**
   * エントリの《》で囲まれた部分のみを取得する
   */
  const match = entry.match(/《(.*?)》/);
  if (!match) return "";

  return includeBrackets ? match[0] : match[1];
}

function removeEnclosingParentheses(entry: string): string {
  /**
   * エントリの()で囲まれた部分を削除する
   */
  return entry.replace(/\(.*?\)/g, "").trim();
}

export function parseCardNames(entry: string): CardNames {
  /**
   * エントリからカード名を取得する
   */
  const fullText = fetchEnclosingAngleBrackets(entry, false);
  const fullName = removeEnclosingParentheses(fullText);
  const [jaName, enName] = fullName.split("/").map((part) => part.trim());

  return {
    fullText,
    fullName,
    jaName,
    enName,
  };
}
