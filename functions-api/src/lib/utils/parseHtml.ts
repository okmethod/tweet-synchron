import { JSDOM } from "jsdom";
import iconv from "iconv-lite";

export class StyleTableExtractor {
  public tableData: string[][] = [];

  public parse(html: Buffer): void {
    // HTMLデータをEUC-JPからUTF-8に変換
    const decodedHtml = iconv.decode(html, "euc-jp");

    // JSDOMを使用してHTMLを解析
    const dom = new JSDOM(decodedHtml);
    const document = dom.window.document;

    // <table class="style_table"> を取得
    const tables = document.querySelectorAll("table.style_table");

    tables.forEach((table) => {
      const rows = table.querySelectorAll("tr");
      rows.forEach((row) => {
        const rowData: string[] = [];
        const cells = row.querySelectorAll("td, th");
        cells.forEach((cell) => {
          rowData.push(cell.textContent?.trim() || "");
        });
        if (rowData.some((cell) => cell)) {
          this.tableData.push(rowData);
        }
      });
    });
  }
}
