import { JSDOM } from "jsdom";
import iconv from "iconv-lite";

function decodeBuffer(buffer: Buffer, encoding: string): string {
  return iconv.decode(buffer, encoding);
}

export class StyleTableExtractor {
  public tableData: string[][] = [];

  public parse(htmlBuffer: Buffer, encoding: string): void {
    const decodedHtml = decodeBuffer(htmlBuffer, encoding);
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
