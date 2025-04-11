import requests

from src.utils.url_parser import encode_euc_jp 
from src.utils.html_parser import StyleTableExtractor
from src.utils.regex_processer import remove_asterisk_number, is_enclosed_in_brackets


def parse_ygo_wiki_table(page_name: str) -> list[str]:
    param = encode_euc_jp(page_name)
    url = f"https://yugioh-wiki.net/index.php?{param}"

    response = requests.get(url)
    response.raise_for_status()

    extractor = StyleTableExtractor()
    extractor.feed(response.text)

    head_items = [row[0] for row in extractor.table_data if any(cell.strip() for cell in row)]
    return head_items


if __name__ == "__main__":
    page_name = "シンクロモンスター"
    monster_names = [
        name for name in (remove_asterisk_number(name) for name in parse_ygo_wiki_table(page_name))
        if is_enclosed_in_brackets(name)
    ]
    for name in monster_names:
        print(name)
