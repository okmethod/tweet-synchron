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

export class TagTextExtractor {
  public extractedTexts: string[] = [];

  public parse(htmlBuffer: Buffer, encoding: string, tagName: string): void {
    const decodedHtml = decodeBuffer(htmlBuffer, encoding);
    const dom = new JSDOM(decodedHtml);
    const document = dom.window.document;

    // 指定されたタグを取得
    const tags = document.querySelectorAll(tagName);
    tags.forEach((tag) => {
      const text = tag.textContent?.trim();
      if (text) {
        this.extractedTexts.push(text);
      }
    });
  }
}

export class StorySectionExtractor {
  public sectionContent: string = "";

  public parse(htmlBuffer: Buffer, encoding: string): void {
    const decodedHtml = decodeBuffer(htmlBuffer, encoding);
    const dom = new JSDOM(decodedHtml);
    const document = dom.window.document;

    // 「原作・アニメにおいて」を含むリスト項目を探して取得
    const listItem = Array.from(document.querySelectorAll("li")).find((el) =>
      el.textContent?.trim().startsWith("原作・アニメにおいて"),
    );
    this.sectionContent = listItem?.textContent?.trim() ?? "Not found";
  }

  public getContent(): string {
    return this.sectionContent;
  }
}

export class WikiTextExtractor {
  private textParts: string[] = [];

  public parse(htmlBuffer: Buffer, encoding: string): void {
    const decodedHtml = decodeBuffer(htmlBuffer, encoding);
    const dom = new JSDOM(decodedHtml);
    const document = dom.window.document;

    // 再帰的にテキストノードを収集
    this.extractText(document.body, dom);
  }

  private extractText(node: HTMLElement | ChildNode, dom: JSDOM): void {
    if (node.nodeType === dom.window.Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        this.textParts.push(text);
      }
    } else if (node.hasChildNodes()) {
      node.childNodes.forEach((child) => this.extractText(child, dom));
    }
  }

  public getText(): string {
    return this.textParts.join(" ");
  }
}
