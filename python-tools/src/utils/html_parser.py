from html.parser import HTMLParser


class StyleTableParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_style_table = False
        self.in_row = False
        self.current_row = []
        self.table_data = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "table" and attrs.get("class") == "style_table":
            self.in_style_table = True
        elif self.in_style_table and tag == "tr":
            self.in_row = True
        elif self.in_style_table and self.in_row and tag in ("td", "th"):
            self.current_row.append("")

    def handle_endtag(self, tag):
        if tag == "table":
            self.in_style_table = False
        elif tag == "tr" and self.in_row:
            self.in_row = False
            if any(self.current_row):  # 空行を除外
                self.table_data.append(self.current_row)
            self.current_row = []

    def handle_data(self, data):
        if self.in_style_table and self.in_row and self.current_row:
            self.current_row[-1] += data.strip()