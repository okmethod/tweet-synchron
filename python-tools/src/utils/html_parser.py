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


class H2TagsParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_h2 = False
        self.card_names = []

    def handle_starttag(self, tag, attrs):
        if tag == "h2":
            self.in_h2 = True

    def handle_endtag(self, tag):
        if tag == "h2" and self.in_h2:
            self.in_h2 = False

    def handle_data(self, data):
        if self.in_h2:
            self.card_names.append(data.strip())


class PreTagsParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_pre = False
        self.current_text = ""
        self.pre_texts = []

    def handle_starttag(self, tag, attrs):
        if tag == "pre":
            self.in_pre = True

    def handle_endtag(self, tag):
        if tag == "pre" and self.in_pre:
            self.in_pre = False
            self.pre_texts.append(self.current_text.strip())
            self.current_text = ""

    def handle_data(self, data):
        if self.in_pre:
            self.current_text += data


class PlainTextParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []

    def handle_data(self, data):
        if data.strip():  # 空白データを除外
            self.text_parts.append(data.strip())

    def get_text(self):
        """収集したテキストを1つの文字列として返す"""
        return " ".join(self.text_parts)
